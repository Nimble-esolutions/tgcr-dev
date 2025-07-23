import "server-only";

const dictionaries = {
	en: () => import("../../dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
	const dictLoader = dictionaries[locale] || dictionaries["en"];
	return dictLoader();
};
