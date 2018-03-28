pipeline {

    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
    	stage('Set up node') {
           steps {
	     sh 'apk --no-cache add git'
	     sh 'apk --no-cache add docker'
           }
        }
        stage('Build dist') { 
            steps {
              sh 'npm install' 
              sh 'npm install grunt-cli' 
              sh './node_modules/bower/bin/bower --allow-root install'
              sh './node_modules/grunt-cli/bin/grunt build'
            }
        }
    stage('Build image') {
           steps {
        withCredentials([usernamePassword(credentialsId: 'ebigitlab', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword} gitlab.ebi.ac.uk:5005"
          sh 'docker build -t gitlab.ebi.ac.uk:5005/ensembl-production/ensembl-prodinf/ensembl-prodinf-web:latest .'
          sh 'docker push gitlab.ebi.ac.uk:5005/ensembl-production/ensembl-prodinf/ensembl-prodinf-web:latest'
        }
	}	
    }

    }
}