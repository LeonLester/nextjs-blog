// import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const fs = require('fs');
const csvDirectory = path.join(process.cwd(), 'csv_files')
let csvToJson = require('convert-csv-to-json');


export function getAllCsvNames() {
    const fileNames = fs.readdirSync(csvDirectory)
    return fileNames.map(fileName => {
      return { 
          id: fileName.replace(/\.csv$/, '')
      }
    })
  }
  


export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getCsvData(id) {
  const fullPath = path.join(csvDirectory, `${id}.csv`)
  let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(fullPath);
//   console.log(json)

  return json
}
