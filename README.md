# 이서원 QA/QC 포트폴리오 초안

## 실행 방법

`dist/portfolio-minimal.html`을 브라우저에서 열면 별도 설치나 외부 CSS 연결 없이 실행됩니다.

## 파일 구성

- `dist/index.html`: 페이지 구조와 콘텐츠
- `dist/styles.css`: 반응형 레이아웃과 디자인
- `dist/script.js`: 모바일 메뉴, 스크롤 메뉴 강조, 이메일 버튼
- `dist/portfolio-minimal.html`: CSS와 JavaScript가 포함된 단일 파일 미리보기

## 이메일 설정

`dist/script.js` 파일 상단의 `CONTACT_EMAIL`에 실제 이메일 주소를 입력하세요.

```js
const CONTACT_EMAIL = "your-email@example.com";
```

## 콘텐츠 순서

Home → 학력 → 아르바이트 경험 → 대외활동·동아리 → 자격·교육 → Contact

## 디자인 체계

- 검정 `#1A1A1A` 배경과 흰색 `#FFFFFF` 전경의 고대비 팔레트
- 넓은 여백, 절제된 타이포그래피, 얇은 경계선 중심의 구성
- 24px 그리드 간격과 32~64px 공간 체계
- 300ms cubic-bezier 모션과 모션 축소 환경 대응
