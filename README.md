# de-reporting-form 

This is where you include your WebPart documentation.

### Install dependencies

Make sure to install all dependencies before building the component.

```bash 
npm install
````

### Building the code


This project uses gulp for managing tasks such as minifying files, running tests, compiling the code and etc.

The component uses HTTPS as a default, by using a self-signed SSL certificate, which is not trusted by the development environment. To preview the component, you must configure the development environment to trust the certificate by running:

```bash
gulp trust-dev-cert
```

To preview the component after configuring the development environment, run:

```bash
gulp serve
```

This command executes a series of gulp tasks to create a local, node-based HTTPS server on localhost:4321 and localhost:5432. The SharePoint workbench is then launched in your default browser to preview web parts from your local dev environment.

To build the component for deployment to a SharePoint page, complete the metadata on the **package-solution.json** file in the **config folder**, then run:

```bash
gulp package-solution
```

The command will produce the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.


