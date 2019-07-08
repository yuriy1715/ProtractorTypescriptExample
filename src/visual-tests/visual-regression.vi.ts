import * as log4js from 'log4js';
import { $ } from 'protractor';
import ImageComparison from '../../common/image-comparison/image_comparison';

describe('Visual regression testing', () => {
	let logger: log4js.Logger;
	let imageComparison: ImageComparison;
	const failDiff = 0.1;
	const headerTitle = $('.header-title');
	const userAccountMenu = '[data-qa=userAccountMenu]';
	const userProfile = $('[data-qa=userProfile]');
	const profileMenuBody = '.mat-menu-content';

	beforeAll(async () => {
		imageComparison = new ImageComparison();
		logger = log4js.getLogger('Spec logger');
	});

	afterAll(async () => {
		logger.info('All test items removed');
	});

	it('Catalogue page', async () => {
		const screenName: string = 'Catalog-explorer';
		const userAccCoord: any = await imageComparison.getBoundingClientRect(userAccountMenu);
		expect(await imageComparison.checkFullPageScreen(screenName, {
			blockOut: [{ height: userAccCoord.height, width: userAccCoord.width, x: userAccCoord.x, y: userAccCoord.y }],
			hideElements: [headerTitle]
		})).toBeLessThan(failDiff);
		await imageComparison.attachScreenToAllure(screenName);
	});

	it('Profile menu', async () => {
		const screenName: string = 'Profile-menu';
		expect(await imageComparison.checkElement(profileMenuBody, screenName, {
			hideElements: [userProfile]
		})).toBeLessThan(failDiff);
		await imageComparison.attachScreenToAllure(screenName);
	});
});
