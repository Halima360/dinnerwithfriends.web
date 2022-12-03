pipeline {

	agent any

	stages {

        stage("Get repo"){

			steps {
				sh "rm -rf ${WORKSPACE}/dinnerwithfriends.web"
				sh "git clone https://github.com/workshopapps/dinnerwithfriends.web.git"
				sh "sudo cp -r ${WORKSPACE}/dinnerwithfriends.web /home/johnoni/dinnerwithfriends.web"
			}

		}

		stage("build frontend"){

			steps {
				sh "cd dinnerwithfriends.web"
				sh "cd dinnerwithfriends.web && npm i --force && CI=false npm run build"
			}
        }

		stage("deploy") {
		
			steps {
                sh "sudo cp -rf ${WORKSPACE}/dinnerwithfriends.web/build/* /home/johnoni/dinnerwithfriends.web/"
                sh "sudo systemctl restart nickstersz.service"

                // sh "sudo serve -s /home/johnoni/dinnerwithfriends.web/build -p 3999"
	
            }
			
	    }

		stage("Performance test"){

			steps{
				echo 'Installing k6'
                sh 'sudo chmod +x setup_k6.sh'
                sh 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
                sh 'k6 run Performace_Test_Catchupf'
			}
		}
	}
}

