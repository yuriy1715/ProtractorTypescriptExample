import { MainPage } from '../src/core/pages/main-page';
import { LeftPanelPage } from '../src/core/pages/leftPanel-page';
import { HeaderPage } from '../src/core/pages/header-page';
import { SearchComponent } from '../src/core/baseComponents/searchComponent';
import { DialogComponent } from '../src/core/baseComponents/dialogComponent';

describe('operations in library with items', () => {

	let mainPage: MainPage;
	let leftPanelPage: LeftPanelPage;
	let headerPage: HeaderPage;
	let searchComponent: SearchComponent;
	let dialogComponent: DialogComponent;

	beforeAll(async () => {
		mainPage = new MainPage();
		leftPanelPage = mainPage.getLeftPanel();
		headerPage = mainPage.getHeader();
		searchComponent = leftPanelPage.getSearchComponent();
		dialogComponent = leftPanelPage.getDialogComponent();
	});

	it('add new process', async () => {
		await headerPage.addNewProcess();
		await leftPanelPage.renameActiveElement('abc');
		const updatedList = await leftPanelPage.getTextFromListOf('process');
		expect(updatedList.length).toBe(1);
		expect(updatedList[0]).toEqual('abc');
	});


	it('add new folder', async () => {
		await leftPanelPage.changeFocus();
		await headerPage.addNewFolder();
		await leftPanelPage.pressEnterOnActiveElement();
		const folderList = await leftPanelPage.getTextFromListOf('folder');
		expect(folderList[0]).toEqual('New folder');
	});

	it('add new process into folder ', async () => {
		await leftPanelPage.changeFocus();
		await headerPage.addNewFolder();
		await leftPanelPage.renameActiveElement('forRemove');
		await leftPanelPage.selectItemInLibraryByName('folder', 'forRemove');
		await headerPage.addNewProcess();
		await leftPanelPage.pressEnterOnActiveElement();
		const expandFolder = await leftPanelPage.getTextOfElementsInFolder();
		expect(expandFolder).toContain('New process');
	});

	it('find item in library', async () => {
		await searchComponent.findItemInLibrary('dragAndDrop');
		const searchItem = await leftPanelPage.processListSearchResult.get(0).getText();
		expect(searchItem).toEqual('dragAndDrop');
		await searchComponent.clearResultAndStartNewSearch('no result');
		expect(await searchComponent.blankSlate.getText()).toEqual('No results found. Did you spell it correctly?');
	});
});
