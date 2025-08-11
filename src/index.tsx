import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useMemo, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [initialState] = useState<ArticleStateType>(defaultArticleState);
	const [applied, setApplied] = useState<ArticleStateType>(defaultArticleState);

	const cssVars = useMemo(
		() =>
			({
				'--font-family': applied.fontFamilyOption.value,
				'--font-size': applied.fontSizeOption.value,
				'--font-color': applied.fontColor.value,
				'--bg-color': applied.backgroundColor.value,
				'--container-width': applied.contentWidth.value,
			} as CSSProperties),
		[applied]
	);

	const handleApply = (next: ArticleStateType) => {
		setApplied(next);
	};

	const handleReset = () => {
		setApplied(initialState);
	};

	return (
		<main className={clsx(styles.main)} style={cssVars}>
			<ArticleParamsForm
				initialValues={applied}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
