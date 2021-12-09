pipeline {
    environment {
    registry = "omerharush93/payoneer"
    registryCredential = 'DockerHub'
//    dockerhostCredentials = 
    dockerImage = ''
    BRANCH_NAME = "${GIT_BRANCH.split("/")[1]}"
    }

    agent any
    stages {
            stage('Unit Testsing') {
                steps {
                    script {
                        sh 'npm install'
//                        sh 'npm test'
//                        sh 'npm audit --fix
                    }
                }
            }
        
            stage('Push to master') {
                steps {
                    withCredentials([
                        usernamePassword(credentialsId: 'GitHub', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')
                    ]) {
                        sh 'git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/omerharush93/PayoneerTask.git master'
                    }
                }
            }

            stage('Building Docker Image') {
                steps {
                    script {
                        echo "Working on branch: ${BRANCH_NAME}"
                        dockerImage = docker.build registry + ":${BRANCH_NAME}"
                    }
                }
            }

            stage('Deploying Docker Image to Dockerhub') {
                steps {
                    script {
                        docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                        }
                    }
                }
            }
      
           stage('Deploy to remote docker host') {
               steps {
                   script {
//                       sh 'docker login -u $DOCKER_HOST_CREDENTIALS_USR -p $DOCKER_HOST_CREDENTIALS_PSW 127.0.0.1:2375'
                       dockerImage.pull()  
//                       sh 'docker pull $dockerImage'
                       sh 'docker stop counter-service'
                       sh 'docker rm counter-service'
                       sh 'docker rmi $registry:current'
                       sh 'docker tag $registry:$BRANCH_NAME $registry:current'
                       sh 'docker run -d -e COLLECTION=prod --name counter-service -p 80:80 $registry:current'
                   }
               }
           }        

            stage('Cleaning Up') {
                steps{
                  sh "docker rmi --force $registry:${BRANCH_NAME}"
                }
            }
        }
    }
