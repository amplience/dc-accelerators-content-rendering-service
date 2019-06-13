# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/techiedarren/dc-accelerators-content-rendering-service/compare/v3.0.0...v4.0.0) (2019-06-13)


### Bug Fixes

* remove unused dep & update content types dep ([4d67a2f](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/4d67a2f))
* **promo:** consolidate promo and promo-list since they share CSS & JS ([1cac347](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/1cac347))
* all modules that use lazy-cache should be processed by the unlazy-loader ([6fd6799](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/6fd6799))
* build script should not spawn a watch task ([bad038a](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/bad038a))
* external block styles ([5475ae8](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/5475ae8))
* include media and docs so that npm readme page is correct ([6c31d8d](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/6c31d8d))
* markdown support on text component ([c9e0c7a](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/c9e0c7a))
* merge adding old files ([caf12a1](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/caf12a1))
* remove init script, this is no longer required ([4bc70f8](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/4bc70f8))
* some components not mapping correctly with template chooser. Added more scenarios to the stories for templateChooser to test with. ([adfed61](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/adfed61))
* **video:** Android workaround when used inside a slider ([c840c63](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/c840c63))
* template chooser was referencing a dead template that would raise an error when the blog post type was used ([714773a](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/714773a))
* typo in the doc ([686ea54](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/686ea54))
* **promoBanner:** Javascript added to give promo banner functionality on mobile ([1317fd3](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/1317fd3))
* **slider:** fix navigation dots not being wired up ([6fb6ca3](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/6fb6ca3))
* **template:** promo template ([e616d8a](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/e616d8a))
* **webpack:** dependencies to fix webpack issue ([f3b3a49](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/f3b3a49))
* **webpack:** handlebars helpers need to be loaded with unlazy-loader to ensure compatibility with webpack ([8bc8e25](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/8bc8e25))
* update dist with latest fixes ([6c02510](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/6c02510))
* windows path support ([5bf2120](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/5bf2120))


### Features

* **banner:** refactor banner component for developer workflow & refactor JS dependency for easier activation ([9512d68](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/9512d68))
* **blogPost:** refactor blogPost component for developer workflow ([29a16a8](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/29a16a8))
* **card:** refactor card component for developer workflow ([a417622](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/a417622))
* **cardList:** refactor cardList component for developer workflow ([2ef21bd](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/2ef21bd))
* **externalBlock:** refactor externalBlock component for developer workflow ([9e28ca8](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/9e28ca8))
* **image:** refactor image component for developer workflow ([0d850a1](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/0d850a1))
* **page:** refactor page component for developer workflow ([0b09dcf](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/0b09dcf))
* **promo:** refactor promo & promo list component for developer workflow ([7582727](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/7582727))
* **sfccSlot:** refactor sfccSlot component for developer workflow ([8512503](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/8512503))
* **slider:** refactor slider component for developer workflow ([4490b53](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/4490b53))
* **splitBlock:** refactor splitBlock component for developer workflow & remove JS dependency ([8b9964d](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/8b9964d))
* **storybook:** add storybook component catalogue to project to enable local development workflow ([e0ec9ca](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/e0ec9ca))
* automatically activate components on DOMContentLoaded ([7001ce1](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/7001ce1))
* **templateChooser:** refactor template chooser component for developer workflow ([3f45727](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/3f45727))
* **text:** refactor text component for developer workflow ([b112d1f](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/b112d1f))
* **video:** refactor video component for developer workflow ([e9654f0](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/e9654f0))
* **visualization:** new visualization component for developer workflow ([2527abb](https://github.com/techiedarren/dc-accelerators-content-rendering-service/commit/2527abb))
