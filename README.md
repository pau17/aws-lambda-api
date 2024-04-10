PASOS PARA CONFIGURAR ESTA APLICACIÓN EN: Serverles Framework con Nodejs y AWS

A) CREAR PROYECTO Y SUBIRLO A LA CONSOLA AWS
Requerimiento:
1:Instalación node: https://nodejs.org/en
2:Crear cuenta AWS Nivel gratuito: https://aws.amazon.com/es/free/

- Configurar Servicios IAM
- crear un usuario en la consola AWS de nombre: serverless-paul
- Crear credenciales para usuario y descargar el archivo csv de las credenciales
- Crear un Grupo para el usuario: serverless-paul-group
- Agregar el siguiente permiso: AdministratorAcces

3: Configurar AWS en mi PC local.

- Descargar e Instalar AWS Commnad Line Interface(AWSCLIV2.msi) de la web: https://aws.amazon.com/es/cli/
- Abrir la Consola de la pc y ejecutar el comando: aws configure
- Ingresar el Aws Access Key ID y Aws Secret Key del archivo csv descargado.
- verificar la instalación ejecutando el comando: Aws --versión

4:Instalación de Serverless Framework: https://www.serverless.com/framework/

- Ingresar a la consola de Windows y ejecutar: npm install -g serverless
- Ejecutar luego el comando: serverless
- Seleccionar HTTP API
- Poner nombre: AWS-LAMBDA-API
- En el proyecto nos crea unarchivo serverless.yml añadir la región
  - En la sección function : es crear un enrutador. a traves de una petición http, en sea visitada la ruta inicial a traves del metodo GET ejecutará la función lambda
- F1>create new terminal.
- Subir el codigo: serverless deploy --verbose  
   - crea un stack, un s3 para subir el codigo, esta configurando la nube de aws - esta creado todo lo que esta en el archivo de configuración - genera los enpoint.
  5: Abrir Visual Code y crear la tabla dynamo en serverless.yml en base a esta doc: 5: https://www.serverless.com/framework/docs-providers-aws-guide-resources

6:Configurar Pc con AWS cli:

- Crear Proyectos con AWS para Windows o Linux
- entrar:https://aws.amazon.com/es/cli/
- Descargar e instalar AWSCLIV2
- Ejecutar>cmd> aws --version
- Muestra: aws-cli/2.15.32 Python/3.11.8 Windows/10 exe/AMD64 prompt/off
- aws configure - AWS Access Key ****\*\***** - AWS Secret Access Key ****\*****
  7:Instalar Serverless Framework: npm install -g serverless
  8: ubicarte cd /c/Proyectos
  9: ejecutar el comando: serverless
  10: No login, no desplegar
  11: Ecoger la plantilla HTPP API
  12:Crear el codigo en base al reto técnico
  13: F1 > Create New Terminal (enter)
  14: ejecutar el comando: serverless deploy --verbose

15: Ejecutar en la consola de comandos: sls deploy --verbose
16: El resultado de la ejecución es lo siguiente:

Debugger attached.

Deploying AWS-LAMBDA-API to stage dev (eu-west-1)

Packaging
Excluding development dependencies for service package
Retrieving CloudFormation stack
Creating CloudFormation stack
Creating new change set
Waiting for new change set to be created
Change Set did not reach desired state, retrying
Executing created change set
CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - AWS-LAMBDA-API-dev
CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
CREATE_IN_PROGRESS - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
CREATE_IN_PROGRESS - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
CREATE_COMPLETE - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
CREATE_COMPLETE - AWS::CloudFormation::Stack - AWS-LAMBDA-API-dev
Uploading
Uploading CloudFormation file to S3
Uploading State file to S3
Uploading service AWS-LAMBDA-API.zip file to S3 (18.41 MB)
Updating CloudFormation stack
Creating new change set
Waiting for new change set to be created
Change Set did not reach desired state, retrying
Executing created change set
UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - AWS-LAMBDA-API-dev
CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CREATE_IN_PROGRESS - AWS::Logs::LogGroup - RegisterPeopleLogGroup
CREATE_IN_PROGRESS - AWS::Logs::LogGroup - ListPeopleLogGroup
CREATE_IN_PROGRESS - AWS::DynamoDB::Table - PeopleSwapiTable
CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CREATE_IN_PROGRESS - AWS::Logs::LogGroup - RegisterPeopleLogGroup
CREATE_IN_PROGRESS - AWS::Logs::LogGroup - ListPeopleLogGroup
CREATE_IN_PROGRESS - AWS::DynamoDB::Table - PeopleSwapiTable
CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CREATE_COMPLETE - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceSave
CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceList
CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceSave
CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceList
CREATE_COMPLETE - AWS::ApiGateway::Resource - ApiGatewayResourceSave
CREATE_COMPLETE - AWS::ApiGateway::Resource - ApiGatewayResourceList
CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceSaveIdVar
CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceSaveIdVar
CREATE_COMPLETE - AWS::ApiGateway::Resource - ApiGatewayResourceSaveIdVar
CREATE_COMPLETE - AWS::Logs::LogGroup - RegisterPeopleLogGroup
CREATE_COMPLETE - AWS::Logs::LogGroup - ListPeopleLogGroup
CREATE_COMPLETE - AWS::DynamoDB::Table - PeopleSwapiTable
CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
CREATE_IN_PROGRESS - AWS::Lambda::Function - RegisterPeopleLambdaFunction
CREATE_IN_PROGRESS - AWS::Lambda::Function - ListPeopleLambdaFunction
CREATE_IN_PROGRESS - AWS::Lambda::Function - ListPeopleLambdaFunction
CREATE_IN_PROGRESS - AWS::Lambda::Function - RegisterPeopleLambdaFunction
CREATE_COMPLETE - AWS::Lambda::Function - ListPeopleLambdaFunction
CREATE_COMPLETE - AWS::Lambda::Function - RegisterPeopleLambdaFunction
CREATE_IN_PROGRESS - AWS::Lambda::Version - ListPeopleLambdaVersioniwAxj3ivaFQI8g0K1q78De4bva1Xggb2yqbsLR446o
CREATE_IN_PROGRESS - AWS::Lambda::Permission - ListPeopleLambdaPermissionApiGateway
CREATE_IN_PROGRESS - AWS::Lambda::Version - RegisterPeopleLambdaVersionH0uG6KSq8NFYRbTmsRcT8BttuzJHy6z8I6w4mzEiZ4  
 CREATE_IN_PROGRESS - AWS::Lambda::Permission - RegisterPeopleLambdaPermissionApiGateway
CREATE_IN_PROGRESS - AWS::Lambda::Permission - ListPeopleLambdaPermissionApiGateway
CREATE_COMPLETE - AWS::Lambda::Permission - ListPeopleLambdaPermissionApiGateway
CREATE_IN_PROGRESS - AWS::Lambda::Permission - RegisterPeopleLambdaPermissionApiGateway
CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodListGet
CREATE_IN_PROGRESS - AWS::Lambda::Version - ListPeopleLambdaVersioniwAxj3ivaFQI8g0K1q78De4bva1Xggb2yqbsLR446o
CREATE_COMPLETE - AWS::Lambda::Permission - RegisterPeopleLambdaPermissionApiGateway
CREATE_COMPLETE - AWS::Lambda::Version - ListPeopleLambdaVersioniwAxj3ivaFQI8g0K1q78De4bva1Xggb2yqbsLR446o
CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodSaveIdVarPost
CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodListGet
CREATE_IN_PROGRESS - AWS::Lambda::Version - RegisterPeopleLambdaVersionH0uG6KSq8NFYRbTmsRcT8BttuzJHy6z8I6w4mzEiZ4  
 CREATE_COMPLETE - AWS::Lambda::Version - RegisterPeopleLambdaVersionH0uG6KSq8NFYRbTmsRcT8BttuzJHy6z8I6w4mzEiZ4
CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodSaveIdVarPost
CREATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodListGet
CREATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodSaveIdVarPost
CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1712784407826
CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1712784407826
CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1712784407826
UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - AWS-LAMBDA-API-dev
UPDATE_COMPLETE - AWS::CloudFormation::Stack - AWS-LAMBDA-API-dev
Retrieving CloudFormation stack
Removing old service artifacts from S3

✔ Service deployed to stack AWS-LAMBDA-API-dev (124s)

endpoints:
GET - https://hnr01oxkgb.execute-api.eu-west-1.amazonaws.com/dev/list
POST - https://hnr01oxkgb.execute-api.eu-west-1.amazonaws.com/dev/save/{id}
functions:
ListPeople: AWS-LAMBDA-API-dev-ListPeople (18 MB)
registerPeople: AWS-LAMBDA-API-dev-registerPeople (18 MB)

Stack Outputs:
RegisterPeopleLambdaFunctionQualifiedArn: arn:aws:lambda:eu-west-1:654654451391:function:AWS-LAMBDA-API-dev-registerPeople:2
ListPeopleLambdaFunctionQualifiedArn: arn:aws:lambda:eu-west-1:654654451391:function:AWS-LAMBDA-API-dev-ListPeople:1  
 ServiceEndpoint: https://hnr01oxkgb.execute-api.eu-west-1.amazonaws.com/dev
ServerlessDeploymentBucketName: aws-lambda-api-dev-serverlessdeploymentbucket-gfbbppigovne

Need a faster logging experience than CloudWatch? Try our Dev Mode in Console: run "serverless dev"
Waiting for the debugger to disconnect...

17: verificamos los servicios creados en AWS:

- se creo la tabla: PeopleSwapiTable en la consola de amazon
- se crearon los lambdas: AWS-LAMBDA-API-dev-registerPeople y AWS-LAMBDA-API-dev-ListPeople
