import { by, element } from 'protractor';
import { BasePage } from './base-page';

export class HeaderPage extends BasePage {

	public readonly headerPage = element(by.css('[data-qa=header]'));
	public readonly collapseBtn = element(by.css('[data-qa=collapseBtn]'));
	public readonly expandBtn = element(by.css('[data-qa=expandBtn]'));
	public readonly addBtn = element(by.css('[data-qa=addBtn]'));
	public readonly addFolder = element(by.css('[data-qa=addFolder]'));
	public readonly addProcess = element(by.css('[data-qa=addProcess]'));
	public readonly undoBtn = element(by.css('[data-qa=undoBtn]'));
	public readonly redoBtn = element(by.css('[data-qa=redoBtn]'));
	public readonly toolItem = element.all(by.css('[data-qa=toolItemBtn]'));
	public readonly userProfile = element(by.css('[data-qa=userProfBtn]'));

	public async addNewProcess(): Promise<void> {
		await this.addBtn.click();
		await this.addProcess.click();
	}

	public async addNewFolder(): Promise<void> {
		await this.addBtn.click();
		await this.addFolder.click();
	}

	public async collapseExpandLeftPanel(): Promise<void> {
		await this.collapseBtn.click();
		await this.expandBtn.click();
	}
}
