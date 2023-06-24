import { Buffer } from "buffer";

export const save = (fileName, jsonObject)=>{
  localStorageWrite(fileName, base64Encode(jsonObject))
}

export const load = (fileName)=>{
  return base64Decode(localStorageRead(fileName))
}

export const exportToString = (jsonObject)=>{
  return base64Encode(jsonObject)
}

export const exportToClipBoard = (jsonObject)=>{
  navigator.clipboard.writeText(exportToString(jsonObject));
}

export const exportToFile = (fileName, jsonObject)=>{
  const encodedObject = exportToString(jsonObject)
  const element = document.createElement("a")
  const file = new Blob([encodedObject], {type: 'text/plain'})
  element.href = URL.createObjectURL(file)
  element.download = fileName
  document.body.appendChild(element)
  element.click()
  element.remove()
}

export const importFromString = (inputText)=>{
  return base64Decode(inputText)
}

export const importFromBrowserPrompt = (promptText)=>{
  const inputText = window.prompt(promptText)
  return importFromString(inputText)
}

export const importFromFile = async()=>{
  const file = await requestTextFileSelection()
  const fileContent = await readTextFile(file)
  return importFromString(fileContent)
}

//Can be used to make data less likely to break on updates
//template is a fresh object with all properties at their default values
//structure gives main structure of data, example: {layerA:true, layerB:true, settings:{secretsettings:true}}
//override is the loaded data that will be used to populate the template, null-overrides will prevent merge
export const deepAssign = (template, structure, override)=>{
  if (override === null) return null
  if (!template || !structure || !override) return template
  if (structure === true)
    return Object.assign(template, override)
    
  for (const key in template) {
    if (structure[key]) //structure-nodes are merged
      template[key] = deepAssign(template?.[key], structure?.[key], override?.[key])
    else if (override.hasOwnProperty(key))
      template[key] = override[key]
  }

  return template
}

//Helper Functions start here

const readTextFile = (file)=>{
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

const requestTextFileSelection = ()=>{
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = false;
    input.accept = 'text/plain';

    input.onchange = ()=>{
      const files = Array.from(input.files);
      
      resolve(files[0]);
    };

    input.click();
  });
}

const base64Decode = (text)=>{
  if (!text) return null
  const jsonText = Buffer.from(text,"base64").toString()
  const decodedObject = JSON.parse(jsonText)
  return decodedObject
}

const base64Encode = (jsonObject)=>{
  if (!jsonObject) return null
  const jsonText = stringifyProperly(jsonObject)
  const encodedObject = Buffer.from(jsonText).toString("base64");
  return encodedObject
}

const localStorageRead = (fileName)=>{
  return window.localStorage.getItem(fileName)
}

const localStorageWrite = (fileName, text)=>{
  window.localStorage.setItem(fileName, text)
}

const stringifyFixer = (key, value)=>{
  if (!key) 
      return value
  if (value === Infinity)
      return "[!$+Infinity$!]"
  if (value === -Infinity)
      return "[!$-Infinity$!]"
  if (Number.isNaN(value))
  {
      console.error("NaN detected for key " + key)
      return "[!$NaN$!]"
  }
  return value
}

const stringifyReplacer = (jsonstring)=>{
  return jsonstring.replaceAll("\"[!$+Infinity$!]\"", "1e5000").replaceAll("\"[!$-Infinity$!]\"", "-1e5000").replaceAll("\"[!$NaN$!]\"", "0")
}

const stringifyProperly = (jsonobject)=>{
  return stringifyReplacer(JSON.stringify(jsonobject,stringifyFixer))
}