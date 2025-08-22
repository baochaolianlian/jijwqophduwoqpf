    // 🔥【新增修复】定义一个Promise来确保数据完全加载后再执行后续操作
        let dataLoadedPromise;
        let resolveDataLoaded;

        function initializeDataLoadPromise() {
            dataLoadedPromise = new Promise(resolve => {
                resolveDataLoaded = resolve;
            });
        }

        // 🔥【完全修复】初始化Dexie数据库 - 解决版本升级死循环问题
        window.db = new Dexie('PhoneChatDB');
        // 🔥【关键修复】创建全局别名，确保所有代码都能访问数据库
        var db = window.db;
        window.activeGlobalWorldbooks = []; // 用于存储当前激活的全局世界书ID

        // 🔥【新增】数据库重置功能
        async function resetDatabase() {
            try {
                console.log('🔄 开始重置数据库...');

                // 关闭数据库连接
                if (db.isOpen()) {
                    db.close();
                }

                // 删除数据库
                await db.delete();
                console.log('✅ 数据库已删除');

                // 重新打开数据库（会自动创建新的）
                await db.open();
                console.log('✅ 数据库已重新创建');

                return true;
            } catch (error) {
                console.error('❌ 重置数据库失败:', error);
                return false;
            }
        }

        // 🔥【新增】检查数据库健康状态
        async function checkDatabaseHealth() {
            try {
                await db.open();

                // 测试基本表访问
                const testTables = ['characters', 'chatMessages', 'apiSettings'];
                for (const tableName of testTables) {
                    await db[tableName].count();
                }

                console.log('✅ 数据库健康检查通过');
                return true;
            } catch (error) {
                console.error('❌ 数据库健康检查失败:', error);
                return false;
            }
        }