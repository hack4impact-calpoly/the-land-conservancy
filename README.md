# the-land-conservancy
A volunteer management program to track/log hours, access volunteer information, and view available prize milestones.

## Table of Contents
- [the-land-conservancy](#the-land-conservancy)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Purpose](#purpose)
    - [Team](#team)
  - [Getting Started for Developers](#getting-started-for-developers)
    - [Clone the repository](#clone-the-repository)
    - [Download the npm packages for the frontend and backend](#download-the-npm-packages-for-the-frontend-and-backend)
    - [Set the executable permissions for the pre-commit hook for linting](#set-the-executable-permissions-for-the-pre-commit-hook-for-linting)
    - [Set up your environmental variables](#set-up-your-environmental-variables)
    - [Add ESLint and Prettier into your IDE](#add-eslint-and-prettier-into-your-ide)
    - [Running the frontend](#running-the-frontend)
    - [Running the backend](#running-the-backend)
    - [Get familiar with the database](#get-familiar-with-the-database)
  - [Contributing](#contributing)
    - [Making Changes](#making-changes)
    - [Commiting Changes](#commiting-changes)
    - [Making Pull Requests](#making-pull-requests)


## Overview

### Purpose
The Land Conservancy of SLO works with landowners and government to care for the diverse wildlands and critical habitats of the Central Coast through conservation, restoration, and stewardship, all while connecting people to the land and one another.  

The purpose of this application is to provide an application and incentive for volunteers to log hours that they have worked for The Land Conservancy. This is so that the organizers at The Lad Conservancy can easily track and report these in order to receive funding from the government and continue their work.

### Team
The Land Conservancy team consists of 11 current Cal Poly students. The team members are listed below: 

2022-2023 Team:
- [Saanvi Dua](https://www.linkedin.com/in/saanvidua/) - Project Manager
- [Ryan Hu](https://www.linkedin.com/in/ryan-hu/) - Tech Lead
- [Ryan Chan](https://www.linkedin.com/in/ryan-chan7/) - Tech Lead
- [Justin Lau](https://www.linkedin.com/in/lau-justin/) - Designer/Software Developer
- [John Ieng](https://www.linkedin.com/in/johnieng/) - Software Developer 
- Lauren Allen - Software Developer
- [Vi-Linh Vu](https://www.linkedin.com/in/vilinhv/) - Software Developer
- [Kim-Linh Vu](https://www.linkedin.com/in/kim-linh-vu-a97816197/) - Software Developer
- [Oliver Lane](https://www.linkedin.com/in/oliver-lane-0919351bb/) - Software Developer
- [Sankalp Varshney](https://www.linkedin.com/in/sanv12/) - Software Developer
- Rishab Baldua - Software Developer

2021-2022 Team:
- [Jonathon Banh](https://www.linkedin.com/in/jonathon-banh-b2b2131b8/) - Project Manager
- [Hannah Chan](https://www.linkedin.com/in/hannahochan/) - Designer
- [Marissa Darnell](https://www.linkedin.com/in/marissa-leal-darnell/) - Tech Lead
- [Ben McMann](https://www.linkedin.com/in/benjamin-mcmann-33b2421b8/) - Software Developer
- [Bora Joo](https://www.linkedin.com/in/borajoo/) - Software Developer 
- [Noah Yuen](https://www.linkedin.com/in/noahyuen/) - Software Developer
- [Ritvik Durgempudi](https://www.linkedin.com/in/ritvik-durgempudi-a32aa2221/) - Software Developer
- [Sam Wathen](https://www.linkedin.com/in/sam-wathen127/) - Software Developer
  
## Getting Started for Developers  

### Clone the repository
``` git clone https://github.com/hack4impact-calpoly/the-land-conservancy.git ```  
### Download the npm packages for the frontend and backend  
```cd frontend```  
```npm i```  
```cd ../backend```  
```npm i```  

### Set the executable permissions for the pre-commit hook for linting
```cd ..```  
```chmod +x frontend/.husky/pre-commit```  
```chmod +x backend/.husky/pre-commit```  

### Set up your environmental variables
Don't forget to add the necessary `.env` files to your `frontend` and `backend`

### Add ESLint and Prettier into your IDE  
If your are using VSCode or another IDE, go to Extensions and install **ESLint** and **Prettier**. This will ensure that your code follows a standard style and will be easier for other developers to read :)   
**You may need to run the linting scripts in the frontend and backend folders to get the IDE to show formatting errors**.  
`npm run lint-check`  
Also recommended: enable the "format on save" setting in your VSCode settings if that is your editor of choice.  

### Running the frontend
   -  ```npm start ``` (every time you pull, you might need to run ```npm i```)  

### Running the backend
   -  ```npm run dev ``` (every time you pull, you might need to run ```npm i```)

### Get familiar with the database
Our database schemas can be found within the project files under `backend/models/<schemaName>.ts`


## Contributing 
**Make sure to follow the [Git Commits & Pull Requests Template](https://h4i.notion.site/Git-Commits-Pull-Requests-9726a4c2b17d48c89ea51b8303389473)**

### Making Changes
1. Before you start making changes, always ```git pull``` and then ```npm i``` to make sure your code is up to date 
2. Create a branch ```git checkout -b <name-of-branch>```
3. Make changes to the code 
4. ```npm run lint-check``` to ensure code standards. (running ```npm run lint-write-all``` will fix most of the styling errors)

### Commiting Changes
1. ```git add .``` (to stage all files) or ```git add <file-name>``` (to stage specific file)
2. ```git commit -m "<type>[optional scope]: <description>"``` or ```git commit``` to get a message prompt
3. ```git push -u origin <name-of-branch>```

### Making Pull Requests
1. Go to the Pull Requests tab
2. Find your PR
3. (If applicable, provide a screenshot of your work in the comment area)
4. Link your PR to the corresponding **Issue**  
5. Request a reviewer to check your code
6. Once approved, your code is ready to be merged in 🎉

