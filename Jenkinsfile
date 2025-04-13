pipeline {
    agent any

    environment {
        GH_TOKEN = credentials('github_token') 
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: 'github_token', url: 'https://github.com/30Leena/WeatherDevops.git', branch: 'main'
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
                GIT_USER = "30Leena"
                GIT_EMAIL = "leena.velan@gmail.com"
            }
            steps {
                withEnv(["GH_TOKEN=${GH_TOKEN}"]) {
                    timeout(time: 5, unit: 'MINUTES') {
                        bat 'git config --global user.email "%GIT_EMAIL%"'
                        bat 'git config --global user.name "%GIT_USER%"'
                        // IMPORTANT: Set correct repo URL here
                        bat 'git remote set-url origin https://%GH_TOKEN%@github.com/30Leena/WeatherDevops.git'
                        bat 'npm run deploy'
                    }
                }
            }
        }
    }

    post {
        failure {
            echo 'Build failed!'
        }
        success {
            echo 'Build and deployment succeeded!'
        }
    }
}



