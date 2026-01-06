pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }
    


    environment {
        APP_NAME = 'cicd-demo-app'
        DOCKER_IMAGE = "cicd-demo-app:${BUILD_NUMBER}"
        CONTAINER_NAME = 'cicd-app-container'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                dir('src') {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                dir('src') {
                    sh '''
                        docker run --rm ${DOCKER_IMAGE} sh -c "npm install --include=dev && npm test"
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh '''
                    # Stop and remove existing container if it exists
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    # Run new container
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p 3000:3000 \
                        --restart unless-stopped \
                        ${DOCKER_IMAGE}

                    echo "Application deployed successfully!"
                    echo "Access at: http://localhost:3000"
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
        always {
            echo 'Cleaning up old images...'
            sh 'docker image prune -f || true'
        }
    }
}
