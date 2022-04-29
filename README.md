# the-land-conservancy
A volunteer management program to track/ log hours and access volunteer information.

## Table of Contents
- [Getting Started for Developers](#getting-started-for-developers)
  - [Clone the repository](#clone-the-repository)
  - [Run the frontend](#running-the-frontend)
  - [Run the backend](#running-the-backend)
  - [Add ESLint and Prettier into your IDE](#add-eslint-and-prettier-into-your-ide)
- [Contributing](#contributing)
  - [Making Changes](#making-changes)
  - [Commiting Changes](#commiting-changes)
  - [Making Pull Requests](#making-pull-requests)

  
## Getting Started for Developers  

### Clone the repository
``` git clone https://github.com/hack4impact-calpoly/the-land-conservancy.git ```  
  
- #### Set pre-commit hook for linting  
```git config --local core.hooksPath .githooks/```  
  
- #### Download npm packages for the frontend and backend  
```cd frontend```  
```npm i```  
```cd ../backend```  
```npm i```  


### Running the frontend
   -  ```npm start ``` (every time you pull, you might need to run ```npm i```)  

### Running the backend
   -  ```npm run dev ``` (every time you pull, you might need to run ```npm i```)


### Add ESLint and Prettier into your IDE  
If your are using VSCode or another IDE, go to Extensions and install ESLint and Prettier.  
This will ensure that your code follows a standard style and will be easier for other developers to read :)   
**You may nee to run the linting scripts in the frontend and backend folders to get the IDE to show formatting errors**.  
`npm run lint`  
also recommended: enable the "format on save" setting in your vscode settings if that is your editor of choice  


## Contributing 

### Making Changes
1. Before you start making changes, always ```git pull``` and then ```npm i``` to make sure your code is up to date 
2. Create a branch ```git checkout -b <name-of-branch>```
3. Make changes to the code 
4. ```npm run lint``` to ensure code standards. (running ```npm run lint-fix``` will fix most of the styling errors)

### Commiting Changes
1. ```git add .``` (to stage all files) or ```git add <file-name>``` (to stage specific file)
2. ```git commit -m "short descriptive message describing chages"``` or ```git commit``` to get a message prompt
3. ```git push -u origin <name-of-branch>```

### Making Pull Requests
1. Go to the Pull Requests tab
2. Find your PR
3. (If applicable, provide a screenshot of your work in the comment area)
4. Link your PR to the corresponding **Issue**  
5. Request a reviewer to check your code
6. Once approved, your code is ready to be merged in 🎉

