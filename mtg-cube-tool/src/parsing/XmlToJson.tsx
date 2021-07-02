import * as XmlParser from 'fast-xml-parser'

// converts cockatrice XML files to JSON files 
export function xmlToJson(xml: string) {
    const jsonObject = XmlParser.parse(xml, {
        ignoreAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: true,
    })

    console.log(JSON.stringify(jsonObject))
    return jsonObject
}