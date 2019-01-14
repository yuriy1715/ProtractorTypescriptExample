import { HeaderPage } from './header-page';
import { LeftPanelPage } from './leftPanel-page';

export class MainPage {
	public getHeader(): HeaderPage {
		return new HeaderPage();
	}

	public getLeftPanel(): LeftPanelPage {
		return new LeftPanelPage();
	}
}
