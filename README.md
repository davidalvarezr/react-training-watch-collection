# react-training-watch-collection

- Mentor: Maxym Kot

## Get started
The "backend" is Dropbox. You can make the app work by creating a project in your dropbox:
1. https://www.dropbox.com/developers > ``App console`` > ``Create app``.

2. You must then change the permissions: ``Permissions`` >
  
  - [x] files.content.write
  - [x] files.content.read

3. Then, you have to generate the access token: ``Settings`` > ``Generated Access Token`` > `Generate`
4. Copy and paste the generated access token into an ``.env`` file at the root of your project folder
```dotenv
REACT_APP_DROPBOX_ACCESS_TOKEN=<generated_access_token>
```

It will then add those features:
- Store the list online
- Retrieve the list from another instance of the app

### Run the project
Do not forget the above steps (.env)
```shell
yarn install && npm start
```


## Description

Small project to handle React. This is an app designed for watch collectors.

The user will be able to store its watches with several informations:

- Brand
- Model
- Picture
- Price when bought
- State (never worn, new, used, ...)

There will be a similar list to store a wish list, but with only the Brand, the Model and the Picture.

The user will be able to store its list, the app would then give him a link back to him. 
This link can then be used from another instance of the app, such as another navigator to load the collection and the wish list.
(Collection and wish list will be store in an "Excel database")

## Constraints

- States (I think the hook "useState" ?!)
- React Router
- Typescript & Generics
- UI Library: Ant Design
- Figure out an idea for REST call (using Axios)
  - store the state in a excel that would be host somewhere (use a library to read and write from/to excel files)
- Validation
  - https://github.com/bytesoftio/form
  - https://github.com/bytesoftio/schema#description
  - https://react-hook-form.com/

## Other project to watch do see how to use React properly

https://stash.openwt.com/projects/CMHS/repos/cmhs-frontend/pull-requests

Do not use Formik to handle the forms !

