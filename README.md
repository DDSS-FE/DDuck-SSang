# DDuck-SSang

<div align="center">

[![GitHub Open Issues](https://img.shields.io/github/issues-raw/DDSS-FE/DDuck-SSang?color=green)](https://github.com/DDSS-FE/DDuck-SSang/issues)
[![GitHub Closed Issues](https://img.shields.io/github/issues-closed-raw/DDSS-FE/DDuck-SSang?color=red)](https://github.com/DDSS-FE/DDuck-SSang/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub Open PR](https://img.shields.io/github/issues-pr-raw/DDSS-FE/DDuck-SSang?color=green)](https://github.com/DDSS-FE/DDuck-SSang/pulls)
[![GitHub Closed PR](https://img.shields.io/github/issues-pr-closed-raw/DDSS-FE/DDuck-SSang?color=red)](https://github.com/DDSS-FE/DDuck-SSang/pulls?q=is%3Apr+is%3Aclosed)

<img src="https://user-images.githubusercontent.com/59217352/156923585-2088d9d6-e498-4528-8795-e8441021ef4a.png" alt="icon" width="250"/>
  
</div>

## 프로젝트 소개

<pre> DDuck-SSang(떡상)은 미국 주식, 가상화폐 등의 금융 자산의 실시간 시세 데이터, 경제 뉴스 등을 제공합니다.
</pre>

## 멤버

<div align="center">
  
| <img src="https://user-images.githubusercontent.com/59217352/156923286-4f7f2920-86d6-4c1e-bddf-d04c5e85ac0f.png" width="150"> | <img src="https://user-images.githubusercontent.com/59217352/156923312-41a2ccfb-ed86-4b5e-bbb4-bc5528bce9c0.png" width="150"> | <img src="https://user-images.githubusercontent.com/59217352/156923092-6d313289-3ee9-413e-897f-113103f85006.png" width="150"> | <img src="https://user-images.githubusercontent.com/59217352/156923326-ee2cd5b3-6bcb-4d26-ac07-847c7e3ab322.png" width="150"> |  
| ----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
|  **김창민** <br>[@chmini](https://github.com/chmini)   |  **서대원** <br>[@Serzhul](https://github.com/Serzhul)   |  **이본행** <br>[@BonhaengLee](https://github.com/BonhaengLee)     |  **이희승** <br>[@2heeesss](https://github.com/2heeesss)|

</div>

## 기술 스택

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/scss-DB7093?style=flat-square&logo=SASS&logoColor=white"/><br>
  
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Strapi-000000?style=flat-square&logo=strapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/SQLite-4479A1?style=flat-square&logo=SQLite&logoColor=white"/><br>
  
  <img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=Jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/React%20Testing%20Library-121212?style=flat-square&logo=Testing Library&logoColor=E33332"/>
  <img src="https://img.shields.io/badge/playwright-logo.svg?color=c75c4e"/>
</div>

## 데모

## 외부 api 목록

- 주식, 암호화폐 가격: finnhub
- 주식 시세: yahoo-finance
- 뉴스목록: bing-news-search

## 상태관리

관리해야하는 데이터는 관심목록, 뉴스목록, 주가 데이터가 있으며 이들은 데이터 변경이 잦으므로 Context API를 채택하기에는 성능개선에 한계가 있다고 판단했습니다.

props를 사용하지 않고 하위 컴포넌트로 전달만하는 컴포넌트, props를 전달하기 위해서 작성하는 반복되는 코드문제를 해결하기 위해 redux를 도입했습니다.

action, reducer, selector, store 를 세팅하는 보일러플레이트 코드를 피하기 위해 redux toolkit을 사용했습니다.

## \***\*기술적 도전\*\***

- React.js, Next.js를 통한 SSG, SSR, SPA 사용
- Redux와 thunk를 통한 상태 관리 로직 구현
- Canvas API를 사용한 차트 구현
- TypeScript, SCSS 사용, 비동기 로직 최적화
- jest, react-testing-library를 사용한 TDD(Test Driven Development)
- playwright를 사용한 E2E testing
