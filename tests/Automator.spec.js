const { test, expect } = require('@playwright/test');
var fs = require('fs');
const { parse } = require("csv-parse");
const prompt = require('prompt-sync')();


async function readCSV(file)
{
    return new Promise((resolve, reject) => {
        let instruction = [];
    fs.createReadStream(file)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    //console.log(row);
    instruction.push(row);
  })
  .on("end", function () {
    //console.log("finished");
    resolve (instruction);
  })
  .on("error", function (error) {
    //console.log(error.message);
  });
    
        
    })
}




test('has title', async ({ page }) => {
    
    //let scriptName = prompt('Instruction File -> ');
    let ins = await readCSV('tests/scenarios/test3.csv');
    console.log('----- Starting -----');
    console.log(ins.length);
    for(let x = 0; x < ins.length;x++)
    {
        let currentIns = ins[x];
        let currentSelector = currentIns[0];
        let currentValue = currentIns[1];
        let currentAction = currentIns[2];
        let expectEvent = currentIns[3];
        
        if(currentAction == 'wait'&& currentValue != '')
            await page.waitForTimeout(parseInt(currentValue));

        
        if(currentAction == 'click'  && currentSelector != '')
            await page.click(currentSelector);
        
        if(currentAction == 'insert'  && currentSelector != '' && currentValue != '')
            await page.fill(currentSelector,currentValue);

        if(currentAction == 'navigate'   && currentValue != '')
            await page.goto(currentValue);

        if(currentAction == 'expect' && currentValue != '' && currentSelector != '')
        {
            switch(expectEvent)
            {
                case 'tobeattached':
                    await expect(currentSelector).toBeAttached();
                    break;

                case 'tobechecked':
                    await expect(currentSelector).toBeChecked();
                    break;
                
                case 'tobedisabled':
                    await expect(currentSelector).toBeDisabled();
                    break;
                
                case 'tobeeditable':
                    await expect(currentSelector).toBeEditable();
                    break;
                
                case 'tobeempty':
                    await expect(currentSelector).toBeEmpty();
                    break;

                case 'tobeenabled':
                    await expect(currentSelector).toBeEnabled();
                    break;

                case 'tobefocused':
                    await expect(currentSelector).toBeFocused();
                    break;

                case 'tocontaintext':
                    await expect(currentSelector).toContainText(currentValue);
                    break;

                case 'tobehidden':
                    await expect(currentSelector).toBeHidden();
                    break;

                case 'tohavetext':
                    await expect(currentSelector).toHaveText(currentValue);
                    break;

                case 'tohavetitle':
                    await expect(page).toHaveTitle(currentValue);
                    break;
                
                case 'tohaveurl':
                    await expect(page).toHaveURL(currentValue);
                    break;

                default:
                    console.log('No Event Found');
            }
        }
    }

    
  });