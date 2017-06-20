const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: 'true' });

nightmare
  .goto('https://www.google.ru/imghp')
  .type('input#lst-ib', '123')
  .click('button.sbico-c')
  .wait(3000)
  .evaluate(() => {
    const elements = Array.from(document.querySelectorAll('.rg_di .rg_meta'));
    const willReturn = [];
    elements.map(element => {
      const asString = element.innerHTML;
      const asObject = JSON.parse(asString);
      willReturn.push({
        height: asObject.oh,
        imageSrc: asObject.ou,
        width: asObject.ow
      });
    });
    return willReturn;
  })
  .end()
  .then(result => {
    console.log(result);
  });
