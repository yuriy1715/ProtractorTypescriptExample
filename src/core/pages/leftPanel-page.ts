import { browser, by, element, ElementArrayFinder, promise, protractor } from 'protractor';

import { BasePage } from './base-page';
import { SearchComponent } from '../baseComponents/searchComponent';
import { DialogComponent } from '../baseComponents/dialogComponent';

export class LeftPanelPage extends BasePage {
	public readonly processLibToolsArea = element(by.css('[data-qa=process_lib_tools]'));
	public readonly leftPanelPage = element.all(by.css('[data-qa=leftPanelArea]'));
	public readonly selectViewBtn = element(by.css('[data-qa=selectViewBtn]'));
	public readonly searchBtn = element(by.css('[data-qa=searchBtn]'));
	public readonly sortBtn = element(by.css('[data-qa=sortBtn]'));
	public readonly processLibArea = element.all(by.css('[data-qa=processLibArea]'));
	public readonly processList = element.all(by.css('[data-qa=processList] .node-caption'));
	public readonly folderList = element.all(by.css('[data-qa=folderList] .node-caption'));
	public readonly processListSearchResult = element.all(by.css('[data-qa=processLibSearchResultsArea] .node-caption'));
	public readonly menuProcessLibElement = element(by.css('[data-qa=menuProcessLibElement]'));
	public readonly renameBtn = element(by.css('[data-qa=renameBtn]'));
	public readonly deleteBtn = element(by.css('[data-qa=deleteBtn]'));
	public readonly expandFolderBtn = element(by.css('[data-qa=expandFolder]'));
	public readonly whiteSpace = element(by.css('.tree-whitespace'));

	public getTextFromListOf(listItem: 'folder' | 'process'): promise.Promise<string> {
		switch (listItem) {
			case 'folder':
				return this.folderList.getText();
			case 'process':
				return this.processList.getText();
			default:
				break;
		}
		return this.folderList.getText();
	}

	public getSearchComponent(): SearchComponent {
		return new SearchComponent();
	}

	public getDialogComponent(): DialogComponent {
		return new DialogComponent();
	}

	public async selectItemInLibraryByPosition(item: 'folder' | 'process', position: number, openMenu?: boolean):
	Promise<void> {
		const elementList = this.selectProcessOrFolder(item);
		if (!openMenu) {
			return elementList.get(position).click();
		} else {
			await elementList.get(position).click();
			await this.menuProcessLibElement.click();
		}
	}

	public async selectItemInLibraryByName(item: 'folder' | 'process', name: string, openMenu?: boolean): Promise<void> {
		const elementList = this.selectProcessOrFolder(item);
		if (!openMenu) {
			return elementList.filter((elem) => elem.getText()
				.then((text) => text === name)).click();
		} else {
			await elementList.filter((elem) => elem.getText()
				.then((text) => text === name)).click();
			await this.menuProcessLibElement.click();
		}
	}

	public selectProcessOrFolder(name: string): ElementArrayFinder {
		if (name === 'folder') {
			return this.folderList;
		} else if (name === 'process') {
			return this.processList;
		} else {
			throw new Error('no items, need to use \'folder\' or \'process\'');
		}
	}

	public async selectActionInMenuItem(actions: 'rename' | 'delete'): Promise<void> {
		switch (actions) {
			case 'rename':
				await this.renameBtn.click();
				break;
			case 'delete':
				await this.deleteBtn.click();
				break;
		}
	}

	public async getTextOfElementsInFolder(): Promise<string> {
		const expandedListElements = await element.all(by.css('[aria-level=\'1\'] .node-caption')).getText();
		return expandedListElements;
	}

	public async pressEnterOnActiveElement(): Promise<void> {
		await browser.switchTo().activeElement();
		await browser.actions().sendKeys(protractor.Key.ENTER).perform();
	}

	public async renameActiveElement(name: string): Promise<void> {
		await browser.switchTo().activeElement().sendKeys(name);
		await browser.actions().sendKeys(protractor.Key.ENTER).perform();
	}

	public async changeFocus(): Promise<void> {
		return this.whiteSpace.click();
	}

	public async expandFolder(): Promise<void> {
		return this.expandFolderBtn.click();
	}
}
