pipeline {
  agent any
  environment {
    NPM_REGISTRY = 'https://registry.npmmirror.com' // 国内镜像加速
    APP_NAME = 'express-api' // 项目名称
    // 通过环境变量区分 PR 构建
    // IS_PR = env.CHANGE_ID ? 'true' : 'false' // CHANGE_ID 存在时为 PR 构建
  }
  tools {
    nodejs 'node 20' // 确保与全局配置名称一致
  }
  triggers {
  // 使用正确的触发器名称
  // githubPullRequests(
  //   triggerMode: GitHubPRTriggerMode.HOOK,  // 需配合 Webhook
  //   events: [GitHubPRTriggerEvent.OPENED, GitHubPRTriggerEvent.UPDATED]
  // )
  githubPullRequests(
    triggerMode: 'HEAVY_HOOK',
    events: [GitHubPRTriggerEvent.OPENED, GitHubPRTriggerEvent.UPDATED],
    // branches: [new GitHubPRBranch('dev')]
  )
}
  stages {
    // 阶段1：拉取代码
    stage('Git Check') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.ghprbSourceBranch ?: 'dev']], // 自动处理 PR 分支
          extensions: [
            // 合并 PR 到目标分支（如 master
            [$class: 'PreBuildMerge', options: [mergeRemote: 'origin', mergeTarget: 'master']]
          ],
          userRemoteConfigs: [[url: env.GIT_URL,refspec: '+refs/pull/*:refs/remotes/origin/pr/*']]
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
    // stage('Compressed Files') {
    //   when {
    //     expression { env.IS_PR == 'false' } // 非 PR 构建时执行
    //   }
    //   steps {
    //     sh "zip -r ${APP_NAME}.zip . -x 'node_modules/*'"
    //     archiveArtifacts artifacts: '*.zip', allowEmptyArchive: false
    //   }
    // }
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
        // if (env.IS_PR == 'false') {
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
        // }
        cleanWs()
      }
    }
    success {
      script {
        def commitSha = env.ghprbActualCommit ?: env.GIT_COMMIT
        githubNotify(
          context: 'jenkins/build', 
          description: 'Build Passed', 
          status: 'SUCCESS', 
          sha: commitSha,
          targetUrl: "${env.BUILD_URL}"
        )
      }
    }
    failure {
      script {
        def commitSha = env.ghprbActualCommit ?: env.GIT_COMMIT
        githubNotify(
          context: 'jenkins/build', 
          description: 'Build Failed', 
          status: 'FAILURE', 
          sha: commitSha,
          targetUrl: "${env.BUILD_URL}"
        )
      }
    }
  }
}