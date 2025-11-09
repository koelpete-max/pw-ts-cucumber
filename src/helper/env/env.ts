import * as dotenv from "dotenv";

export const getEnv = () => {
  dotenv.config({
    override: true,
    path: `src/helper/env/.env.${process.env.ENV}`,
  });

  console.log("Variables configured");
  console.log(`npm_config_tags=${process.env.npm_config_tags}`);
};
