// pipeline {
// 	agent any
// 	environment {
// 		NPM_REGISTRY = 'https://registry.npmmirror.com' // 国内镜像加速
//     APP_NAME = 'express-api' // 项目名称
// 		IS_PR = env.CHANGE_ID ? 'true' : 'false' // CHANGE_ID 存在时为 PR 构建
// 	}
//   tools {
//     nodejs 'node 20' // 确保与全局配置名称一致
//   }
// 	stages {
// 		// 阶段1：拉取代码
// 		stage('Git Check') {
// 			steps {
// 				checkout scm // 从GitHub拉取代码
// 			}
// 		}
// 		// 阶段2：安装依赖
// 		stage('Install Dependencies') {
// 			steps {
// 				script {
//           sh 'node -v'
//           sh 'which npm'      // 检查 npm 是否存在
//           sh "npm ci --registry=${NPM_REGISTRY}"
//           // sh 'npm ci'
// 				}
// 			}
// 		}
//     // 阶段3：格式化 & 代码检查
// 		stage('Format Code & Lint Code') {
//       steps {
//         sh 'npm run lint:format'
//         sh 'npm run lint:fix'
//       }
// 		}
// 		stage('Compressed Files') {
// 			steps {
//         sh "zip -r ${APP_NAME}.zip . -x 'node_modules/*'"
//         // 归档产物（ZIP文件和原始目录）
//         archiveArtifacts artifacts: '*.zip', allowEmptyArchive: false
// 			}
// 		}
// 		// 阶段5：Nginx 部署
// 		stage('Deploy TO Nginx') {
//       steps {
//         script {
//           def execCommand = """
//             # 启用详细日志和错误退出
//             set -ex
//             # 加载 nvm 环境变量（关键步骤）
//             source /root/.nvm/nvm.sh
//             # 进入项目目录
//             cd /var/www/${APP_NAME} || { echo '目录切换失败'; exit 1; }
//             # 解压构建产物
//             unzip -o ${APP_NAME}.zip || { echo '解压失败'; exit 1; }
//             # 删除 ZIP 文件
//             rm -f ${APP_NAME}.zip
//             chmod -R 755 .
//             # 安装依赖
//             npm install --registry=${NPM_REGISTRY}
//             pm2 list
//             if pm2 list | grep ${APP_NAME}; then
//               pm2 stop ${APP_NAME} || true
//               pm2 delete ${APP_NAME} || true
//             fi
//             # pm2 启动应用
//             npm run pm2 || exit 1
//             # 保存进程列表
//             pm2 save
//             # 检查 Nginx 配置 并重启
//             nginx -t && systemctl reload nginx
//           """
//           // source /root/.nvm/nvm.sh
//           // npm config set prefix "/root/.nvm/versions/node/v20.10.0"

//           // 插件将构建产物部署到远程服务器
//           sshPublisher(
//             publishers: [
//               sshPublisherDesc(
//                 configName: 'my ssh server',
//                 transfers: [
//                   sshTransfer(
//                     // 指定要传输的文件
//                     sourceFiles: '*.zip',
//                     // 移除文件路径前缀
//                     // removePrefix: 'dist',
//                     // 远程服务器上的目标目录
//                     remoteDirectory: "/${APP_NAME}",
//                     // 执行的命令
//                     execCommand: execCommand
//                   )
//                 ],
//                 verbose: true
//               )
//             ]
//           )
//         }
//       }
// 		}
// 	}
// 	post {
//     always {    
//       script {
//         // 发送构建结果通知
//         emailext(
//           subject: '$DEFAULT_SUBJECT',
//           body: '$DEFAULT_CONTENT',
//           mimeType: 'text/html',
//           to: 'a15277019572@aliyun.com',
//           attachmentsPattern: '*.zip', // 指定附件路径
//           recipientProviders: [
//             [$class: 'CulpritsRecipientProvider'],  // 通知代码提交者
//             [$class: 'RequesterRecipientProvider']  // 通知触发构建的用户
//           ],
//           attachLog: true  // 附加构建日志
//         )
//       }
//       // 清理工作空间（可选）
//       cleanWs()
//     }
// 		success {
//       githubNotify status: 'SUCCESS', context: 'Jenkins CI'  // 反馈成功状态[6](@ref)
//     }
//     failure {
//       githubNotify status: 'FAILURE', context: 'Jenkins CI'  // 反馈失败状态
//     }
// 	}
// }

pipeline {
  agent any
  environment {
    NPM_REGISTRY = 'https://registry.npmmirror.com' // 国内镜像加速
    APP_NAME = 'express-api' // 项目名称
    // 通过环境变量区分 PR 构建
    IS_PR = env.CHANGE_ID ? 'true' : 'false' // CHANGE_ID 存在时为 PR 构建
  }
  tools {
    nodejs 'node 20' // 确保与全局配置名称一致
  }
  triggers {
    // GitHub PR 触发构建（需配置 Webhook）
    GitHubPullRequest(
      triggerOnPullRequest: true,
      triggerOnCommit: true,
      events: [GitHubPRTriggerEvent.OPENED, GitHubPRTriggerEvent.UPDATED]
    )
  }
  stages {
    // 阶段1：拉取代码
    stage('Git Check') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BRANCH]], // 自动处理 PR 分支
          extensions: [
            // 合并 PR 到目标分支（如 main）
            [$class: 'PreBuildMerge', options: [mergeRemote: 'origin', mergeTarget: 'master']]
          ],
          userRemoteConfigs: [[url: env.GIT_URL]]
        ])
      }
    }
    // 阶段2：安装依赖
    stage('Install Dependencies') {
      steps {
        script {
          sh 'node -v'
          sh 'which npm'
          sh "npm ci --registry=${NPM_REGISTRY}"
        }
      }
    }
    // 阶段3：格式化 & 代码检查
    stage('Format Code & Lint Code') {
      steps {
        sh 'npm run lint:format'
        sh 'npm run lint:fix'
      }
    }
    // 阶段4：构建产物压缩（仅非 PR 构建执行）
    stage('Compressed Files') {
      when {
        expression { env.IS_PR == 'false' } // 非 PR 构建时执行
      }
      steps {
        sh "zip -r ${APP_NAME}.zip . -x 'node_modules/*'"
        archiveArtifacts artifacts: '*.zip', allowEmptyArchive: false
      }
    }
    // 阶段5：Nginx 部署（仅非 PR 构建执行）
    // stage('Deploy TO Nginx') {
    //   when {
    //     expression { env.IS_PR == 'false' } // 非 PR 构建时执行
    //   }
    //   steps {
    //     script {
    //       def execCommand = """
    //         set -ex
    //         source /root/.nvm/nvm.sh
    //         cd /var/www/${APP_NAME} || { echo '目录切换失败'; exit 1; }
    //         unzip -o ${APP_NAME}.zip || { echo '解压失败'; exit 1; }
    //         rm -f ${APP_NAME}.zip
    //         chmod -R 755 .
    //         npm install --registry=${NPM_REGISTRY}
    //         pm2 list
    //         if pm2 list | grep ${APP_NAME}; then
    //           pm2 stop ${APP_NAME} || true
    //           pm2 delete ${APP_NAME} || true
    //         fi
    //         npm run pm2 || exit 1
    //         pm2 save
    //         nginx -t && systemctl reload nginx
    //       """
    //       sshPublisher(
    //         publishers: [
    //           sshPublisherDesc(
    //             configName: 'my ssh server', // 使用 Jenkins 凭证 ID
    //             transfers: [
    //               sshTransfer(
    //                 sourceFiles: '*.zip',
    //                 remoteDirectory: "/${APP_NAME}",
    //                 execCommand: execCommand
    //               )
    //             ],
    //             verbose: true
    //           )
    //         ]
    //       )
    //     }
    //   }
    // }
  }
  post {
    always {    
      script {
        // 仅在非 PR 构建时发送邮件
        if (env.IS_PR == 'false') {
          emailext(
            subject: '$DEFAULT_SUBJECT',
            body: '$DEFAULT_CONTENT',
            mimeType: 'text/html',
            to: 'a15277019572@aliyun.com',
            // attachmentsPattern: '*.zip',
            recipientProviders: [
              [$class: 'CulpritsRecipientProvider'],
              [$class: 'RequesterRecipientProvider']
            ],
            attachLog: true
          )
        }
        cleanWs()
      }
    }
  success {
    script {
      def commitSha = env.ghprbActualCommit ?: env.GIT_COMMIT
      githubNotify(
        context: 'jenkins/build', 
        description: 'Build passed', 
        status: 'Successful', 
        sha: commitSha,
        targetUrl: "${env.RUN_DISPLAY_URL}"
      )
    }
  }
  failure {
    script {
      def commitSha = env.ghprbActualCommit ?: env.GIT_COMMIT
      githubNotify(
        context: 'jenkins/build', 
        description: 'Build failed', 
        status: 'FAILURE', 
        sha: commitSha,
        targetUrl: "${env.RUN_DISPLAY_URL}"
      )
    }
  }
}