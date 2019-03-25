const expect = require("chai").expect;
const puppeteer = require("puppeteer");

describe('Google Teste', () =>{
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

    it('Navegar ate a pagina inicial do Google', async function(){
        await page.goto('https://www.google.com.br');
        await page.waitForSelector('#viewport');
       // await page.waitFor(5000); //sleep
    });
    // it('deve pass', () => {
    //     expect(1+1).to.equal(2);
    // });
    it('Verificar Título da Página', async function(){
        const title = await page.title();
        expect(title).to.contain("Google");  
    })

    it('Verificar se contem parte de URL', async function(){
        const url = await page.url();
        expect(url).to.contain(".com");  
    })

    it('Dar refresh na página e verificar se carregou o conteúdo', async function(){
        await page.reload();
        await page.waitForSelector("#viewport");
    })
});