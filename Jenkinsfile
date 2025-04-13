pipeline {
    agent any

    environment {
        GIT_USER_NAME = '30Leena'
        GIT_USER_EMAIL = 'leena.velan@gmail.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
                    bat """
                        git config --global user.name "%GIT_USER_NAME%"
                        git config --global user.email "%GIT_USER_EMAIL%"
                        set GITHUB_TOKEN=%GITHUB_TOKEN%
                        npm run deploy
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Build process completed.'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
