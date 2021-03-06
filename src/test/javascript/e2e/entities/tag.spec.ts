import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Tag e2e test', () => {

    let navBarPage: NavBarPage;
    let tagDialogPage: TagDialogPage;
    let tagComponentsPage: TagComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tags', () => {
        navBarPage.goToEntity('tag');
        tagComponentsPage = new TagComponentsPage();
        expect(tagComponentsPage.getTitle()).toMatch(/Tags/);

    });

    it('should load create Tag dialog', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage = new TagDialogPage();
        expect(tagDialogPage.getModalTitle()).toMatch(/Create or edit a Tag/);
        tagDialogPage.close();
    });

    it('should create and save Tags', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage.setNameInput('name');
        expect(tagDialogPage.getNameInput()).toMatch('name');
        tagDialogPage.save();
        expect(tagDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TagComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class TagDialogPage {
    modalTitle = element(by.css('h4#myTagLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
