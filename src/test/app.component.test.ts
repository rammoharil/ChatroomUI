import 'core-js/es7/reflect';
import 'mocha';
import * as Chai from 'chai';
const expect = Chai.expect;
import { AppComponent } from 'src/app/app.component';

describe('SharedService', () => {
    let service: AppComponent;

    beforeEach(() => {
        service = new AppComponent();
    });

    it('should be an object', () => {
        expect(service).to.be.an('object');
    });
});
