import { DependencyContainer } from "tsyringe";

export const DiTestFixture: {
  di: DependencyContainer | null;
} = {
  di: null,
};

export const PageFixture = {
  get page() {
    return DiTestFixture.di?.resolve("Page");
  },
};
