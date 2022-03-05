import { test, expect } from '@playwright/test';

test.describe('Watchlist', () => {
  test('관심목록 없음 확인 -> 시장 상세페이지에서 관심 목록 추가 -> 관심목록 확인 -> 삭제 -> 관심목록 확인', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/');
    // * : 로그인
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/more' }*/),
      page.locator('svg[role="img"]').nth(3).click(),
    ]);
    await page.locator('text=로그인').nth(2).click();
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill('tester@crl.com');
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill('123123');
    await page.locator('button:has-text("Submit")').click();

    // * : 관심목록 탭 이동 후 관심 목록 없음 확인
    await Promise.all([
      await page.goto('http://localhost:3000/watchlist', {
        waitUntil: 'domcontentloaded',
      }),
      page.locator('path').nth(2).click(),
      await page.isVisible('bl_emptyData'),
    ]);

    // * : 시장 탭 이동
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/market/stock' }*/),
      page.locator('text=시장뉴스관심목록더보기 >> path').first().click(),
    ]);

    // * : 시장 상세 페이지에서 관심목록에 종목 추가
    await page.goto('http://localhost:3000/market/stock/AAPL');
    await page.locator('button >> nth=1').click();

    // // * : 관심목록 탭 이동
    await page.locator('text=시장뉴스관심목록더보기 >> path').nth(2).click();
    await expect(page).toHaveURL('http://localhost:3000/watchlist');

    // // * : 수정 버튼 클릭
    await page.locator('button').click();

    // // * : 삭제 버튼 클릭 후 관심 목록 없음 확인
    await page.locator('button').nth(1).click();
    const locator = page.locator('.StockList_bl_emptyData__4p4jN');
    await expect(locator).toContainText('관심 목록이 없습니다.');
  });

  test('시장 상세페이지에서 관심목록 추가/삭제 버튼 토글되는지 확인', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/');
    // * : 로그인
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/more' }*/),
      page.locator('svg[role="img"]').nth(3).click(),
    ]);
    await page.locator('text=로그인').nth(2).click();
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill('tester@crl.com');
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill('123123');
    await page.locator('button:has-text("Submit")').click();

    // * : 시장 탭 이동
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/market/stock' }*/),
      page.locator('text=시장뉴스관심목록더보기 >> path').first().click(),
    ]);

    // * : AAPL 상세 페이지로 이동
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/market/stock/AAPL' }*/),
      page.locator('text=AAPL').click(),
    ]);
    // * : 시장 상세 페이지에서 관심목록에 종목 추가
    await page.locator('button').nth(1).click();
    // * : 시장 상세 페이지에서 관심목록에 종목 삭제
    await page.locator('button').nth(1).click();

    // * : 관심 목록 없음 확인
    await page.locator('text=시장뉴스관심목록더보기 >> path').nth(2).click();
    await expect(page).toHaveURL('http://localhost:3000/watchlist');

    const locator = page.locator('.StockList_bl_emptyData__4p4jN');
    await expect(locator).toContainText('관심 목록이 없습니다.');
  });
});
