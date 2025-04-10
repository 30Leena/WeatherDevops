pipeline {
    agent any

    tools {
        nodejs 'nodejs' // This matches your configured tool name
    }

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo ' Cleaning workspace...'
                deleteDir()
            }
        }

        stage('Git Checkout') {
            steps {
                git 'https://github.com/30Leena/WeatherDevops.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    echo ' Installing frontend dependencies...'
                    bat 'npm install'
                }
                dir("${env.BACKEND_DIR}") {
                    echo ' Installing backend dependencies...'
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    echo '⚙️ Building frontend...'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo ' Deployment step would go here.'
            }
        }
    }

    post {
        failure {
            echo ' Pipeline failed. Please check the logs.'
        }
        success {
            echo ' Pipeline completed successfully!'
        }
    }
}

