pipeline {
    environment {
    registry = "omerharush93/my-repo"
    registryCredential = 'DockerHub Credentials'
//    dockerhostCredentials = 
    dockerImage = ''
    BRANCH_NAME = "${GIT_BRANCH.replaceFirst(/^.*\//, '')}"    
    }

    agent any
    stages {
//             stage('Cloning our Git') {
//                 steps {
//                 git 'git@github.com/omerharush93/PayoneerTask.git'
//                 }
//             }

            stage('Building Docker Image') {
                steps {
                    script {
                        echo "${env.GIT_BRANCH}"
                        echo "${BRANCH_NAME}"
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
//                        sh 'docker login -u $DOCKER_HOST_CREDENTIALS_USR -p $DOCKER_HOST_CREDENTIALS_PSW 127.0.0.1:2375'
                       //dockerImage.pull()  
                       sh 'docker pull ${dockerImage}'
                       sh 'docker stop counter-service'
                       sh 'docker rm counter-service'
                       sh 'docker rmi ${registry}:current'
                       sh 'docker tag ${registry}:${BRANCH_NAME} ${registry}:current'
                       sh 'docker run -d -e COLLECTION=prod --name counter-service -p 80:80 ${registry}:current'
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
