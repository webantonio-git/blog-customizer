import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	type ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import styles from './ArticleParamsForm.module.scss';

type Props = {
	initialValues: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
	forceOpen?: boolean;
	onClose?: () => void;
};

export const ArticleParamsForm = ({
	initialValues,
	onApply,
	onReset,
	forceOpen,
	onClose,
}: Props) => {
	const [draft, setDraft] = useState<ArticleStateType>(initialValues);
	const [isOpen, setIsOpen] = useState<boolean>(!!forceOpen);
	useEffect(() => {
		if (typeof forceOpen === 'boolean') setIsOpen(forceOpen);
	}, [forceOpen]);
	useEffect(() => setDraft(initialValues), [initialValues]);
	const asideRef = useRef<HTMLElement | null>(null);
	useEffect(() => {
		if (!isOpen) return;
		const onDocClick = (e: MouseEvent) => {
			const target = e.target as Node;
			if (asideRef.current && !asideRef.current.contains(target)) {
				setIsOpen(false);
				onClose?.();
			}
		};
		document.addEventListener('mousedown', onDocClick);
		return () => document.removeEventListener('mousedown', onDocClick);
	}, [isOpen, onClose]);
	const update = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => setDraft((d) => ({ ...d, [key]: value }));

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		onApply(draft);
		setIsOpen(false);
		onClose?.();
	};

	const handleReset: React.FormEventHandler = (e) => {
		e.preventDefault();
		onReset();
		setIsOpen(false);
		onClose?.();
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
			<aside
				ref={asideRef}
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				aria-hidden={!isOpen}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.header}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>
							Задайте параметры
						</Text>
					</div>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={draft.fontFamilyOption}
						onChange={(opt: OptionType) => update('fontFamilyOption', opt)}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={draft.fontSizeOption}
						onChange={(opt: OptionType) => update('fontSizeOption', opt)}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={draft.fontColor}
						onChange={(opt: OptionType) => update('fontColor', opt)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={draft.backgroundColor}
						onChange={(opt: OptionType) => update('backgroundColor', opt)}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={draft.contentWidth}
						onChange={(opt: OptionType) => update('contentWidth', opt)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
