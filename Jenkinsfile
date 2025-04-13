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
                withCredentials([usernamePassword(credentialsId: 'github_token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                    bat """
                        git config --global user.name "%GIT_USER_NAME%"
                        git config --global user.email "%GIT_USER_EMAIL%"
                        set GH_TOKEN=%GITHUB_TOKEN%
                        npm run deploy -- --repo=https://%GITHUB_USER%:%GH_TOKEN%@github.com/30Leena/WeatherDevops.git
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
