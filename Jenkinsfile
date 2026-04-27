pipeline {
    agent any

    tools {
        nodejs 'Node25'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Verify Node') {
            steps {
                 sh 'which node'
                 sh 'node --version'
                 sh 'npm --version'
                 sh 'echo $PATH'
            }
       }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            when {
                expression {
                    return !fileExists("${env.HOME}/.cache/ms-playwright")
                }
            }
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=html,junit'
            }
            post {
                always {
                    junit testResults: 'test-results/*.xml', allowEmptyResults: true

                    publishHTML(target: [
                        allowMissing         : false,
                        alwaysLinkToLastBuild: true,
                        keepAll              : true,
                        reportDir            : 'playwright-report',
                        reportFiles          : 'index.html',
                        reportName           : 'Playwright HTML Report'
                    ])
                }
            }
        }
    }

    post {
        success {
            echo '✅ All tests passed!'
        }
        failure {
            echo '❌ Tests failed — check the Playwright report.'
        }
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}