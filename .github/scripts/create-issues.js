import { readdirSync, readFileSync } from "fs";
import path from "path";

export default async function createIssues({ cwd, github, context, core }) {
  const templatesDir = path.join(cwd, ".github", "templates");

  const files = readdirSync(templatesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const content = readFileSync(path.join(templatesDir, file), "utf-8");
      const { title, body } = getTitleAndBody(content);

      return {
        title,
        body,
      };
    });

  for (const { title, body } of files) {
    try {
      await github.rest.issues.create({
        ...context.repo,
        title,
        body,
      });

      core.notice(`Issue created: ${title}`);
      console.log(`Issue created: ${title}`);
    } catch (error) {
      core.error(`Error creating issue ${title}`);
      console.error(`Error creating issue ${title}: ${error.message}`);
    }
  }
}

function getTitleAndBody(content) {
  const titleMatch = content.trim().match(/# (.*)/)[1];

  if (!titleMatch) {
    throw new Error(
      "Title not found. Make sure to add a h1 title to the template.",
    );
  }

  const title = titleMatch.trim();
  const body = content.replace(/# .*/, "").trim();

  return { title, body };
}
