const expect = require("chai").expect;
const puppeteer = require("puppeteer");

describe('Zero Bank Teste', () =>{
    let browser;
    let page;

    before(async function(){
        browser = await puppeteer.launch({
            headless: false, //se for verdadeiro não abre o browser para visualização
            slowMo: 0, //valocidade de execução para visualização
            devtools: false, //abre o console (F12) no browser para depurar os testes
            timeout: 10000 //tempo limite para aguardar o browser abrir - padrão 40 segundos
        });
        page = await browser.newPage();
        // await page.setViewport({
        //     width: 800,
        //     height: 600
        // })
    });

    after(async function(){
        await browser.close();
    })

    it ('Exibir conteúdo padrão', async function(){
        await page.goto("http://zero.webappsecurity.com");
        await page.waitForSelector('#carousel');
    });

    it('Verificar se foi aberta a pagina Online Banking', async function(){
        await page.click('#onlineBankingMenu');
        await page.waitForSelector('#online_banking_features');

        const text = await page.$eval("h1", element => element.textContent); //guardar em uma constante 'text', o texto de um elemento, neste caso do elemento h1
        expect(text).to.contain("Online Banking");
    });

    it("Caixa de pesquisa deve funcionar", async function(){
        await page.type("#searchTerm", "some value"); //Inserir o valor "some value" no campo de id #searchTerm
        await page.keyboard.press('Enter'); //simula clicar na tecla Enter

        await page.waitForSelector('h2'); //aguarda até o seletor h2 ser carregado na página

        const text = await page.$eval("h2", element => element.textContent); //guardar em uma constante 'text', o texto de um elemento, neste caso do elemento h1
        expect (text).to.contain("Search Results");
    });

    it("Login deve falhar", async function(){
        await page.click("#signin_button");
        await page.waitForSelector("#login_form");

        await page.type("#user_login","fake name");
        await page.type("#user_password","fake password");

        await page.click("input[type='submit']");

        await page.waitForSelector(".alert-error");
        const message = await page.$eval(".alert-error", element => element.textContent);   
        expect(message).to.contain("Login and/or password are wrong.");
        
    });

    it("Contar elementos", async function(){
        await page.waitFor(5000);
        await page.goto("http://zero.webappsecurity.com");
        const count = await page.$$eval("#pages-nav > li", items => items.length); //dois $ pois é mais de um item 'li', lenght pega a quantidade
        expect(count).to.equal(3); //verificando que na home page tem 3 elementos 'li' inspecionados na linha acima
    });

});