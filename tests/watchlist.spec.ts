import { test, expect } from '@playwright/test';

test.describe('Watchlist', () => {
  test('관심목록 없음 확인 -> 상세페이지에서 AAPL 추가 -> 관심목록에서 AAPL 확인 -> 삭제 -> 관심목록 확인', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/market/stock');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/more' }*/),
      page.locator('text=시장뉴스관심목록더보기 >> path').nth(3).click(),
    ]);
    await page.locator('text=로그인').click();
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill('tester@crl.com');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('123123');
    await page.locator('text=Submit').click();

    // * : 관심목록 탭 이동 후 관심 목록 없음 확인
    await Promise.all([
      page.locator('text=시장뉴스관심목록더보기 >> path').nth(2).click(),
      expect(page).toHaveURL('http://localhost:3000/watchlist'),
      expect(
        page.locator('[data-testid="no-watchlist-message"]')
      ).toBeVisible(),
    ]);

    // * : 시장 탭 이동
    await Promise.all([
      page.locator('text=시장뉴스관심목록더보기 >> path').nth(0).click(),
      expect(page).toHaveURL('http://localhost:3000/market/stock'),
    ]);

    // * : AAPL 상세 페이지 이동 후 관심목록에 AAPL 종목 추가
    await page.locator('text=애플').click();
    await expect(page).toHaveURL('http://localhost:3000/market/stock/AAPL');
    await page.locator('button').nth(1).click();

    // * : 관심목록 탭 후 AAPL 확인
    await page
      .locator('text=시장뉴스관심목록더보기 >> path')
      .nth(2)
      .click({ delay: 800 });
    await expect(page).toHaveURL('http://localhost:3000/watchlist');
    await expect(
      page.locator('[data-testid="AAPL-market-info-list-item"]')
    ).toBeVisible();

    // * : 수정 버튼 클릭
    await page.locator('button').nth(0).click();

    // // * : 삭제 버튼 클릭 후 관심 목록 없음 확인
    await page.locator('button').nth(2).click();
    await expect(
      page.locator('[data-testid="no-watchlist-message"]')
    ).toBeVisible();
  });

  test('마켓 상세페이지에서 관심목록 추가/삭제 버튼 토글되는지 확인', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/market/stock');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/more' }*/),
      page.locator('text=시장뉴스관심목록더보기 >> path').nth(3).click(),
    ]);
    await page.locator('text=로그인').click();
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill('tester@crl.com');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('123123');
    await page.locator('text=Submit').click();

    // * : 관심목록 탭 이동 후 관심 목록 없음 확인
    await page.locator('text=시장뉴스관심목록더보기 >> path').nth(2).click();
    await expect(
      page.locator('[data-testid="no-watchlist-message"]')
    ).toBeVisible();

    // * : 시장 탭 이동
    await page.locator('text=시장뉴스관심목록더보기 >> path').nth(0).click();

    // * : AAPL 상세 페이지 이동 후 관심목록에 AAPL 종목 추가
    await page.locator('text=애플').click();
    await expect(page).toHaveURL('http://localhost:3000/market/stock/AAPL');
    await page.locator('button').nth(1).click();
    // * : AAPL 종목 삭제
    await page.locator('button').nth(1).click({ delay: 300 });

    // * : 관심목록 탭 이동 후 관심 목록 없음 확인
    await page.locator('text=시장뉴스관심목록더보기 >> path').nth(2).click();
    await expect(
      page.locator('[data-testid="no-watchlist-message"]')
    ).toBeVisible();
  });
});
