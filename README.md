# react-training-watch-collection

- Mentor: Maxym Kot

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

