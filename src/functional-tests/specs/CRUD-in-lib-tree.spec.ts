import * as log4js from 'log4js';
import { waits } from '../../../common/helpers/waits';
import { LeftPanelPage } from '../../core/pages';

describe('', () => {

	let leftPanelPage: LeftPanelPage;
	let logger: log4js.Logger;

	beforeAll(async () => {
		leftPanelPage = new LeftPanelPage();
		logger.info('tests started');
	});

	afterAll(async () => {
		logger.info('tests finished');
	});

	it('Rename process by button', async () => {
		const selectedItem = await leftPanelPage.selectItemByNameWithLevel('process', 'abc');
		await leftPanelPage.openMenuInSelectedItem(selectedItem);
		await leftPanelPage.selectActionInMenuItem('rename');
		await leftPanelPage.renameActiveElement('a');
		const processSelector = leftPanelPage.getProcessByNameWithLevel('a', 0);
		expect(await processSelector.getText()).toEqual('a');
	});

	it('DranAndDrop element by name', async () => {
		await leftPanelPage.changeFocus();
		await leftPanelPage.selectItemInLibraryByName('folder', 'dragAndDrop');
		const location = await leftPanelPage.selectItemByNameWithLevel('process', 'a', 1);
		const target = leftPanelPage.processLibToolsArea;
		await leftPanelPage.dragAndDropElement(location, target, { x: 10, y: 10 });
		const item = leftPanelPage.getProcessByNameWithLevel('a', 0);
		await waits.waitForElementVisible(item);
		expect(await item.isDisplayed()).toBe(true);
	});
});