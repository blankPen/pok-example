module.exports = function creator(ctx) {
    const defaultProjectName = 'pok-template'
    return {
        name: 'pok-template',
        async setup() {
            const res = await ctx.prompts([
                {
                    name: 'projectName',
                    type: 'text',
                    message: '项目名:',
                    initial: defaultProjectName,
                    onState: (state) => (String(state.value).trim() || defaultProjectName)
                }
            ], {
                onCancel() {
                    process.exit(1);
                }
            });
            return {
                autoInstall: false, // 是否自动执行 npm install
                sourceDir: 'template', // 模板所处目录
                outputDir: res.projectName, // 模板输出目录
                env: { // 模板使用的环境变量
                    projectName: res.projectName
                }
            };
        },
        end() {
            console.log(ctx.chalk.green(`\n  项目创建完成，快速启动: `))
            console.log(`    cd ${ctx.setupConfig.outputDir}`)
        }
    }
}