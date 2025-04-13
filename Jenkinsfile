pipeline {
    agent any

    environment {
        GH_TOKEN = credentials('github_token') 
    }

    stages {
        stage('Checkout SCM') {
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
            environment {
                GIT_AUTHOR_NAME = '30Leena'
                GIT_AUTHOR_EMAIL = 'leena.velan@gmail.com'
                GIT_COMMITTER_NAME = '30Leena'
                GIT_COMMITTER_EMAIL = 'leena.velan@gmail.com'
            }
            steps {
                bat 'git config --global user.email "leena.velan@gmail.com"'
                bat 'git config --global user.name "30Leena"'
                withEnv(["GH_TOKEN=${env.GH_TOKEN}"]) {
                    bat 'npm run deploy'
                }
            }
        }
    }

    post {
        success {
            echo ' Deployment successful!'
        }
        failure {
            echo ' Build failed!'
        }
    }
}
