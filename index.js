import readline from "readline";
import colors from "colors";
import path from "path";
import inquirer from "inquirer";
import fsp from "fs/promises";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const root = process.cwd(); // текущая директория

const searchFiles = (dirName) => {
	return fsp
		.readdir(dirName)
		.then((choices) => {
			return inquirer.prompt([ // ввыводим сообщения пользователю
				{
					name: "fileName",
					type: "list",
					message: "Выберите файл",
					choices,
				},
				{
					name: "searchString",
					type: "input",
					message: "Введите фразу для поиска",
					async when({ fileName }) {
						const fullPath = path.join(dirName, fileName);
						const stat = await fsp.stat(fullPath);

						return stat.isFile();
					},
				},
			]);
		})
		.then(async ({ fileName, searchString }) => {
			const fullPath = path.join(dirName, fileName);
			if (searchString === undefined) return searchFiles(fullPath);

			return Promise.all([
				fsp.readFile(fullPath, "utf-8"),
				Promise.resolve(searchString),
			]);
		})
		.then((result) => {
			if (result) {
				const [text, searchString] = result;
				const pattern = new RegExp(searchString, "g");
				let count = 0;
				const out = text.replace(pattern, () => {
					count++;
					return colors.red(searchString);
				});

				console.log(out, "\n", colors.green(`Найдено ${count} совпадения`));
			}
		});
};

rl.question(
	`Вы в дириктории: ${root} \n Введите путь к директории: `,
	(dirPath) => {
		const dirName = path.join(root, dirPath);

		searchFiles(dirName);
	}
);

rl.on("close", () => process.exit(0));
