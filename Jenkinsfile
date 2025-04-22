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
                        git config --global credential.helper store
                        echo https://%GITHUB_USER%:%GITHUB_TOKEN%@github.com > %USERPROFILE%\\.git-credentials

                        IF EXIST temp-gh-pages rd /s /q temp-gh-pages
                        git clone https://%GITHUB_USER%:%GITHUB_TOKEN%@github.com/30Leena/WeatherDevops.git temp-gh-pages
                        cd temp-gh-pages
                        git checkout gh-pages || git checkout --orphan gh-pages

                        for /d %%i in (*) do if /i not "%%i"==".git" rd /s /q "%%i"
                        del /q *.*

                        xcopy /E /Y /I ..\\build\\* .

                        git add .
                        git commit -m "Deploy from Jenkins"
                        git push origin gh-pages --force
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
