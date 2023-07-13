//Writer Module
const prompt = require('prompt-sync')();
const ObjectsToCsv = require('objects-to-csv');

function automationInstructions()
{
    let instruction = []
    while(true)
    {
        let currentIns = {'Selector':'','Value':'','Action':'','Target':''}
        currentIns['Action'] = prompt('Action -> ');
        if(currentIns['Action'] == 'navigate' || currentIns['Action'] == 'wait')
            currentIns['Selector'] = ''
        else
            currentIns['Selector'] = prompt('Selector -> ');

        
        currentIns['Value'] = prompt('Value -> ');
        currentIns['Target'] = ''
        if(currentIns['Action'] == 'expect')
            currentIns['Target'] = prompt('expect event -> ');

        instruction.push(currentIns);
        let exit = prompt('Exit Y/N -> ');
        if(exit == 'Y')
            break;
        console.log('------------------------')
        
    }

    return instruction;
}


let scriptInstruction = automationInstructions()
let scriptName = prompt('Script Name: ');
const csv = new ObjectsToCsv(scriptInstruction);
csv.toDisk('tests/scenarios/'+scriptName+'.csv');
//console.log(csvData);
