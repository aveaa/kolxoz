const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "4ch ";
const { inspect } = require("util");
const request = require('request');

client.on('typingStart', (channel, user) => {
    if (user.id !== '410838014990876672') return;
    channel.startTyping();
});
client.on('typingStop', (channel, user) => {
    if (user.id !== '410838014990876672') return;
    channel.stopTyping(true);
});

client.on("ready", () => {
    const embed = new Discord.RichEmbed()
        .setColor("#1a1a1a")
        .setDescription('Протокол `Ильич` успешно запушен.')
        .addField("Хочешь проверить, все ли функционирует?", "[Нажми на данную ссылку](https://www.heroku.com)")
        .setTimestamp();
    client.channels.get('468445836116754432').send({ embed });
});

client.on("ready", () => {
    console.log(`Ильич включен, находится на ${client.guilds.size} серверах`);
    client.user.setStatus("dnd");

    function randomStatus() {
        let status = [`4ch help`, `сломать твое ебало.exe`, `смотрит на твое ебало.ebat`, `28 ударов ножом`]
        let rstatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[rstatus]);

    }; setInterval(randomStatus, 10000)
});

client.on("guildCreate", guild => {
    console.log(`Подключаюсь к ${guild.name} (id: ${guild.id}). На этом сервере онлайн составляет ${guild.memberCount} человек`);
});

client.on("guildDelete", guild => {
    console.log(`Соединение прервано с сервером ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
    
    if (message.channel.type === 'dm') {
        if ([client.user.id, '327872942124040192'].includes(message.author.id)) return;
        client.channels.get('443473891843768330').send({
            embed: {
                author: {
                    name: message.author.username + '#' + message.author.discriminator + '  (' + message.author.id + ')',
                    icon_url: message.author.displayAvatarURL
                },
                color: 1710618,
                description: '``` ' + message.content + ' ```',

                timestamp: new Date(),
            }
        })
    }

    if (message.content.startsWith('https://github.com/privetstn', 'https://github.com/privetstn/ilich')) {
        message.delete();
    }

    if (message.content === "Ильич") {
        message.channel.send("Чтобы получить помощь по боту пропиши `4ch help`");
    }

    if (message.channel.type === 'text' && !['438026942068031490', '417266233562365952'].includes(message.guild.id)) {
        message.guild.leave().catch();
        return;
    }

    if (message.author.bot) return;
    let prefixes = ['Ильич ', 'Илья ', 'Ильич', 'Илья', 'Ильич, ', 'Илья, '];
    let prefix = false;
    prefixes.forEach(prefix_ => {
        if (message.content.startsWith(prefix_)) {
            prefix = prefix_;
        }
    })
    if (prefix === false) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    

    if (command === "ping" || command === "pinging" || command === "пинг" || command === "пингос") {
        const m = await message.channel.send("Секундочку");
        m.edit(`Хоп. Замена сообщения произошла за ${m.createdTimestamp - message.createdTimestamp}ms. Нетрудным вычислением мы можем понять, что твой пинг составляет ${Math.round(client.ping)}ms`);
    }

    if (command === "отключись" || command === "выключись") {
        client.user.setStatus("dnd");
    }

    if (command === "say" || command === "sa" || command === "скажи" || command === "скаж") {
        if (['409252455877050369', '263306827473616898', '410838014990876672'].includes(message.author.id)) return;
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => { });
        message.channel.send(sayMessage);
    }

    if (command == "ask" || command === "ass" || command === "вопрос" || command === "вопро") {
        if (['409252455877050369'].includes(message.author.id)) return;
        if (!args[1]) return message.channel.send({
            embed: {
                color: 1710618,
                title: "Ой, ошибочка вышла!",
                description: `Оу, у тебя не получилось задать мне вопрос, попробуй ещё раз.`,
                footer: {
                    text: "Ильич",
                },
            }
        });
        let replies = ["Да", "Нет", "Да хуй его знает", "Мне похуй", "Ебись оно конем", "Твой вопрос слишком охуеннен для советского народа",  "Не лезь блять, она тебя сожрет", "А ты неплох, хочу я тебе сказать", "А не пошел бы ты нахуй?"];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.join(" ");

        let ilichask = new Discord.RichEmbed()
            .setColor("#1a1a1a")
            .addField(`Твой вопрос звучал так, ${message.author.username}`, question)
            .addField("Я ответил на него следующим образом", replies[result])
            .setFooter("Ильич");
        message.channel.send(ilichask)
        message.delete();
    }

    if (command == "choose" || command == "выбрать") {

        if (!args[1]) return message.channel.sendmessage.channel.send({
            embed: {
                color: 1710618,
                title: "Ой, ошибочка вышла!",
                description: `Напиши два слова и повтори попытку позже, лох`,
                footer: {
                    text: "Ильич",
                },
            }
        });

        let replies = [`${args[0]}`, `${args[1]}`];
        let result = Math.floor((Math.random() * replies.length));

        let chooseEmbed = new Discord.RichEmbed()
            .setAuthor("Ильич", "https://cdn.discordapp.com/attachments/438026942068031494/443095568399728640/1525085792.jpg")
            .setColor("#1a1a1a")
            .addField("Кого же я выбрал, хм... Наверное это", replies[result])
            .setFooter("Ильич");
        message.channel.send(chooseEmbed)
    }

    if ((command === "remote_say" || command === "rs") && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        if (message.channel.id = undefined) return message.author.send('Что-то ты попутал, брат');
        let new_args = args;
        const chat = new_args.shift();
        const sayMessage = new_args.join(" ");
        console.log(chat);
        message.guild.channels.get(chat).send(sayMessage).catch(() => { message.reply('Что-то ты попутал, брат'); });
        message.delete().catch(O_o => { });
    }

    if ((command === "us" || command === "user_say")  && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        if (message.guild.members.get === undefined) {
            return message.channel.send('Что-то ты попутал, брат');
        }
        let new_args = args;
        const userse = new_args.shift();
        const UsersayMessage = new_args.join(" ");
        console.log(userse);
        message.guild.members.get(userse).send(UsersayMessage); message.delete();
    }

    if (command === 'addrole' || command === 'arole') {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("Вы не являетесь модератором.");
        let role = message.mentions.roles.first();
        if (!role) return message.channel.send(`Выберите роль.`);
        let member = message.mentions.members.first();
        if (!member) return message.channel.send("Выберите пользователя.");
        let roleid = role.id;
        let rolename = role.name;

        if (!message.guild.roles.get(roleid)) return message.channel.send(`Роль не найдена..`);
        member.addRole(role.id);
        let em = new Discord.RichEmbed()
            .setColor("#1a1a1a")
            .setDescription(`Роль ${rolename} успешно добавлена к пользователю ${member.user.username}.`)
            .setFooter("Ильич")
            .setTimestamp()
        message.channel.send({ embed: em })
        if (member.displayName) {
            em.setDescription(`Роль ${rolename} успешно добавлена к пользователю ${member.displayName}.`)
        }
        message.delete();
    };

    if (command === 'removerole' || command === 'rrole') {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("Вы не являетесь модератором.");
        let role = message.mentions.roles.first();
        if (!role) return message.channel.send(`Выберите роль.`);
        let member = message.mentions.members.first();
        if (!member) return message.channel.send("Выберите пользователя.");
        let roleid = role.id;
        let rolename = role.name;

        if (!message.guild.roles.get(roleid)) return message.channel.send(`Роль не найдена..`);
        member.removeRole(role.id);
        let em = new Discord.RichEmbed()
            .setColor("#1a1a1a")
            .setDescription(`Роль ${rolename} успешно удалена у пользователя ${member.user.username}.`)
            .setFooter("Ильич")
            .setTimestamp()
        message.channel.send({ embed: em })
        if (member.displayName) {
            em.setDescription(`Роль ${rolename} успешно удалена у пользователя ${member.displayName}.`)
        }
        message.delete();
    };

    if (command === "ильич" || command === "ленин" || command === "ilich" || command === "lenin") {
        let unionMessage = await message.channel.send('Загрузка...');
        unionMessage.edit(`Гост сосатб`);
        unionMessage.edit(`Проверка успешно завершена`);
        message.channel.send(unionMessage);
    }

    if ((command === "eval")  && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        const code = args.join(" ");
        const token = client.token.split("").join("[^]{0,2}");
        const rev = client.token.split("").reverse().join("[^]{0,2}");
        const filter = new RegExp(`${token}|${rev}`, "g");
        try {
            let output = eval(code);
            if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
            output = inspect(output, { depth: 0, maxArrayLength: null });
            output = output.replace(filter, "[TOKEN]");
            output = clean(output);
            if (output.length < 1950) {
                message.author.send(`\`\`\`js\n${output}\n\`\`\``);
                message.react("✅")
            } else {
                message.author.send(`${output}`, { split: "\n", code: "js" });
            }
        } catch (error) {
            message.channel.send(`Произошла ошибка \`\`\`js\n${error}\`\`\``);
            message.react("❎")
        }

        function clean(text) {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }
    }

    if (command === 'off') {
    message.delete();
    const embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} ушел пинать хуи, скоро вернется`)
        .setColor("#1a1a1a")
        .setFooter("Ильич")
    message.channel.send({ embed }).then(function (message) {
        message.react('🔜')
    }).catch(function () { });
    }

    if (command === 'on') {
        message.delete();
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username} вернулся, но продолжает пинать хуи`)
            .setColor("#1a1a1a")
            .setFooter("Ильич")
        message.channel.send({ embed }).then(function (message) {
            message.react('🔙')
        }).catch(function () { });
    }

    if (command === 'cinvite' || command === 'chinv') {
        message.delete();
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send({
            embed: {
                color: 1710618,
                title: "Error 405",
                description: `Пошел нахуй, ты не модератор.`,
                footer: {
                    text: "Ильич",
                },
            }
        });
        const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));
        return message.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "Мазохистов, которые ставят в статус игры ссылку на сервер не найдено.");
    }

    if (command === "аватарка" || command === "avatar" || command === "av" || command === "ав") {
        let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({
                embed: {
                    color: 1710618,
                    title: "Error 405",
                    description: `Тот челик, у которого ты хотел скомуниздить аватарку. Его больше нет, я позаботился об этом.`,
                    footer: {
                        text: "Ильич",
                    },
                }
            });
        const embed = new Discord.RichEmbed()
            .setTitle(`Аватарка пользователя ${member.user.tag}`)
            .setImage(member.user.avatarURL)
            .setFooter("Ильич")
            .setColor("#1a1a1a")
            .setDescription('Аватарка предоставлена по запросу ' + message.author + ' (`' + message.author.tag + '`)')
        message.channel.send({ embed });
        message.delete();
    }

    if (command === "lox" || command === "lo" || command === "лох" || command === "ло") {
        let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({
                embed: {
                    color: 16711680,
                    title: "Error 402",
                    description: `База данных лохов сейчас не доступна, повторите попытку позже`,
                    footer: {
                        text: "Ильич",
                    },
                }
            });
        const embed = new Discord.RichEmbed()
            .setTitle(`Я провел работу по поиску лохов, ${message.member.displayName}`)
            .setFooter("Ильич")
            .setColor("#1a1a1a")
            .setDescription('Оказалось, что лохчмо вот этот пользователь, ' + member.user + '')
        message.channel.send({ embed });
        message.delete();
    }

    if (command === "ильи4" || command === "илюха" || command === "iluxa" || command === "ilich") {
        let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({
                embed: {
                    color: 1710618,
                    title: "Произошел сбой.",
                    description: 'Вероятно, ты допустил какую-либо ошибку. Подробнее можно узнать запустив команду `4ch iluxahelp`.',
                    footer: {
                        text: "Ильич",
                    },
                }
            });
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, отправил смску ${member.user.tag} с следующим содержанием`)
            .setFooter("Ильич")
            .setColor("#1a1a1a")
            .setDescription('Брей пизду и ноги, Илюха уже в дороге')
        message.channel.send({ embed });
        message.delete();
    }

    if (command === "sms" || command === "mms" || command === "смс" || command === "ммс") {
        let summoned = message.mentions.members.first();
        const SummonMessage = args.join(" ");
        args.shift();
        message.delete();
        summoned.send(`Тебя позвали на сервере **${message.channel.guild.name}**. \nВот этот юзер **${message.author}** (**${message.author.username}**) \nВ канале **${message.channel}** \n**Для быстрого перехода жмякни на название канала.** \nПричина:**${SummonMessage}** `)
    }

    if (command === "si" || command === "serverinfo" || command === "си" || command === "сервер") {

        if (message.channel.guild.large == true) {
            large = "Да"
        }
        if (message.channel.guild.large == false) {
            large = "Нет"
        }
        if (message.channel.guild.region == "russia") {
            message.channel.guild.region = "Россия"
        }
        let i = 0;
        message.guild.members.forEach(member => {
            if (!member.user.bot) i = i + 1;
        });
        let b = 0;
        message.guild.members.forEach(member => {
            if (member.user.bot) b = b + 1;
        });
        const embed = new Discord.RichEmbed()
        embed.setAuthor(message.author.tag, message.author.avatarURl)
        embed.setTitle('Информация об сервере', message.channel.guild.name)
        embed.setColor("#1a1a1a")
        embed.setThumbnail(message.channel.guild.iconURL)
        embed.addField('ID сервера', message.channel.guild.id, false)
        embed.addField('Владелец сервера', message.channel.guild.owner, true)
        embed.addField('ID владельца сервера', message.channel.guild.ownerID, false)
        embed.addField('Уровень верификации', message.channel.guild.verificationLevel, true)
        embed.addField('Количество пользователей', `${message.channel.guild.memberCount} пользователей из которых ${b} ботов и ${i} людей`, false)
        embed.addField('Количество ролей', message.channel.guild.roles.size, true)
        embed.addField('Количество эмодзи', message.channel.guild.emojis.size, false)
        embed.addField('Количество каналов', message.channel.guild.channels.size, true)
        embed.addField('Сервер большой?', large, false)
        embed.addField('Системный канал', message.channel.guild.systemChannel !== null ? message.channel.guild.systemChannel : 'Нету.', true)
        embed.addField('ID Системного канала', message.channel.guild.systemChannelID !== null ? message.channel.guild.systemChannelID : 'Нету.', false)
        embed.addField('Имя сервера', message.channel.guild.name, true)
        embed.addField('Высшая роль', message.channel.guild.roles.sort((a, b) => a.position - b.position || a.id - b.id).last().name, true)
        embed.addField('AFK канал', message.channel.guild.afkChannel !== null ? message.channel.guild.afkChannel : 'Нету.', false)
        embed.addField('ID AFK канала', message.channel.guild.afkChannelID !== null ? message.channel.guild.afkChannelID : 'Нету.', true)
        embed.addField('Регион', message.channel.guild.region, false);
        message.author.send({ embed });
        message.delete();
    }

    if ((command === "статус") && ['327872942124040192'].includes(message.author.id)) {
        let new_args = args;
        if (new_args[0].toLowerCase() === 'играет' && new_args[1].toLowerCase() === 'в') {
            new_args[0] = 'играет в';
            new_args.splice(1, 1);
        }
        let type = new_args.shift();
        let real_type;
        if (['играет в', 'играет', 'play', 'playing', '0'].includes(type.toLowerCase()))
            real_type = 0;
        else if (['слушает', 'hear', 'hearing', '2'].includes(type.toLowerCase()))
            real_type = 2;
        else if (['смотрит', 'watch', 'watching', '3'].includes(type.toLowerCase()))
            real_type = 3;
        else return message.channel.send(`Ошибка. Тип \`${type.replace(/` /g, "\'")}\` не существует`);
        const status = new_args.join(" ");
        client.user.setPresence({ game: { name: status, type: real_type } }).catch();
        let status_word;
        if (real_type === 0)
            status_word = 'Играет в';
        else if (real_type === 2)
            status_word = 'Слушает';
        else if (real_type === 3)
            status_word = 'Смотрит';

        const embed = new Discord.RichEmbed()
            .setTitle('Статус изменен на:')
            .setDescription(`${status_word} **${status.replace(/` /g, "\\\'")}**`)
            .setColor("#1a1a1a")
            .setFooter("Ильич");
        message.channel.send({ embed });
        message.delete();
    }

    if (command === "создатель" || command === "creator" || command === "разработчик" || command === "coder") {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}`)
            .setFooter("Ильич")
            .setColor("#1a1a1a")
            .setDescription('Разработчик этого бота... Вабба Лабба Даб Даб!')
        message.channel.send({ embed });
        message.delete();
    }

    if (command === "мемы" || command === "мемасы" || command === "memes" || command === "meme") {
        let urls = ['https://cdn.discordapp.com/attachments/398493223225393155/453632588913836032/Z53rDN4nz5w.png', 'https://cdn.discordapp.com/attachments/417266234032390155/453619499548278784/fzlXVdacsRw.png', 'https://cdn.discordapp.com/attachments/417266234032390155/450997044203487232/qnxzAZBNUOY.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/439493461465366559/1524836581.jpg', 'https://cdn.discordapp.com/attachments/398493223225393155/427015490909765643/cChuWmm4tYs.png', 'https://cdn.discordapp.com/attachments/417266234032390155/426837230750007296/IXKmXEGGy4M.pnghttps://cdn.discordapp.com/attachments/417266234032390155/426837230750007296/IXKmXEGGy4M.png', 'https://cdn.discordapp.com/attachments/417266234032390155/426834094530232340/UXrIekEGmn0.png', 'https://cdn.discordapp.com/attachments/417266234032390155/425382301430579200/1521487257.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/425381351366197268/1521489210.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/425380837211766796/1521489086.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/425378101078261760/1521488435.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/425377710437564418/1521488343.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/425374507281154058/1521487571.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/425374290473517097/1521487521.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/425374012919513090/X53H8a-6mXI.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/425373637650939924/1521487371.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/422393484260147201/itMfgO57bko.png', 'https://cdn.discordapp.com/attachments/417266234032390155/422377721780502529/1520626932.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/421782343112589319/1520630969.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/421764894900355073/1520626941.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/419583500321161228/1519757973.jpg', 'https://cdn.discordapp.com/attachments/417266234032390155/419591495822082058/Pke5MphbrmM.png', 'https://cdn.discordapp.com/attachments/417266234032390155/419579325977985066/1.png', 'https://media.discordapp.net/attachments/398493223225393155/423164901155012608/W3HVmKHR6Gc.png', 'https://cdn.discordapp.com/attachments/398493223225393155/419575003776942082/1520079220.jpg', 'https://cdn.discordapp.com/attachments/398493223225393155/410156233773809666/1517859248.jpg', 'https://cdn.discordapp.com/attachments/398493223225393155/410154428595830806/1517858792.jpg', 'https://cdn.discordapp.com/attachments/398493223225393155/408331096606900234/cfywLN1aTp4.png', 'https://media.discordapp.net/attachments/398493223225393155/398494040968003584/XGAJAwowz_A.jpg', 'https://cdn.discordapp.com/attachments/440552492317802496/453966988272992256/S1ee51OoIv0.jpg', 'https://cdn.discordapp.com/attachments/440552492317802496/453967103070961693/ox5poCzXgC8.jpg', 'https://cdn.discordapp.com/attachments/440552492317802496/453967273544122368/dhYHPYVsOzE.jpg', 'https://cdn.discordapp.com/attachments/398493223225393155/453972253093134336/lUGSXAC6gtA.png', 'https://cdn.discordapp.com/attachments/398493223225393155/453972507217625128/FNpC-cdJIHk.png', 'https://cdn.discordapp.com/attachments/398493223225393155/453972784951853056/3tTVDYp7Zuw.png', 'https://media.discordapp.net/attachments/398493223225393155/453973118906662923/Kb8LoT4BS6M.png', 'https://cdn.discordapp.com/attachments/398493223225393155/453973668461150208/C67ua6lmAak.png', 'https://cdn.discordapp.com/attachments/398493223225393155/453974346269065234/B0-1kZgRqU4.png', 'https://cdn.discordapp.com/attachments/398493223225393155/453976173903347712/g22NjV-3crY.png', 'https://cdn.discordapp.com/attachments/438026942068031494/453978707191791616/pQwzHKsF8dE.png', 'https://cdn.discordapp.com/attachments/438026942068031494/453979156804534283/EMCN0ecVDIo.png', 'https://cdn.discordapp.com/attachments/438026942068031494/453980489712271360/SZbEgZKH4wE.png', 'https://cdn.discordapp.com/attachments/417266234032390155/453980853178204172/JQWT_qdqcv8.png', 'https://cdn.discordapp.com/attachments/438026942068031494/453981574514475039/wZYc7tVdiZQ.png', 'https://cdn.discordapp.com/attachments/438026942068031494/453981574514475039/wZYc7tVdiZQ.png', 'https://cdn.discordapp.com/attachments/438026942068031494/453982462947622923/8TZloh5-7h0.png', 'https://cdn.discordapp.com/attachments/438026942068031494/453985371793915917/5rGys5tRfg4.png', 'https://cdn.discordapp.com/attachments/438026942068031494/453986158821507082/G4u7BHfjPRY.png', 'https://cdn.discordapp.com/attachments/438026942068031494/453988065455636481/z5n_LqVZJQY.png'];
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, ога, мемасы смотреш?`)
            .setFooter("Ильич")
            .setColor("#1a1a1a")
            .setImage(urls[Math.floor(Math.random() * urls.length)])
        message.channel.send({ embed });
        message.delete();
    }

    if (command === "battle" || command === "fight" || command === "бой" || command === "битва") {
        const embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .setColor("#1c1c1c")
            .setDescription("Вызываю тебя на бой, кусок дерьма")
        message.channel.send({ embed: embed }).then(() => {
            setTimeout(() => {
                const embed1 = new Discord.RichEmbed()
                    .setAuthor("Ильич", "https://cdn.discordapp.com/attachments/438026942068031494/443095568399728640/1525085792.jpg")
                    .setColor("#1c1c1c")
                    .setDescription("Че ты там вякнул, лошпевич?")
                    .setImage("https://cdn.discordapp.com/attachments/417266234032390155/457816607482445824/1529036170.jpg");
                message.channel.send({ embed: embed1 });
            }, 2500);
        });
        message.delete();
    }

    if ((command === "актив" || command === "акти" || command === "активность" || command === "онлайн" || command === "online" || command === "activity" || command === "онлай" || command === "onlin" || command === "октив" || command === "окти")  && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        message.channel.send('<@&417312577018789899> где мой актив?').then((msg) => {
            setTimeout(function () {
                msg.delete();
                message.channel.send('<@&417312577018789899> а, я его нашел, спасибо за внимание.');
            }, 10000);
        })
        message.delete();
    }

    if ((command === "ushelp" || command === "ushel" || command === "юсхелп" || command === "усхелп")   && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, значит тебе интересен принцип работы`)
            .setColor("#36393e")
            .setDescription('US (`User Say`) - позволяет говорить от имени Ильича в личных сообщениях .\n' +
            'Структура команды выглядит вот так: \n' +
            '`4ch us [id пользователя] [сообщение]` \n')
            .setFooter("Ильич");
        message.author.send({ embed });
        message.delete();
    }

    if ((command === "rshelp" || command === "rshel" || command === "рсхелп" || command === "рсхэлп") && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, значит тебе интересен принцип работы`)
            .setColor("#36393e")
            .setDescription('RS (`Remote Say`) - позволяет говорить от имени Ильича в каналах, где у него есть доступ.\n' +
            'Структура команды выглядит вот так: \n' +
            '`4ch rs [id канала, в котором вы хотите написать от имени бота] [сообщение]` \n')
            .setFooter("Ильич");
        message.author.send({ embed });
        message.delete();
    }

    if (command === "avhelp" || command === "avatarhelp" || command === "аватархелп" || command === "авхэлп") {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, значит тебе интересен принцип работы`)
            .setColor("#36393e")
            .setDescription('Аватар (`Avatar`) - Команда Ильича, отображающая аватар другого пользователя\n' +
            'Структура команды выглядит вот так: \n' +
            '`4ch avatar @user` \n')
            .setFooter("Ильич");
        message.author.send({ embed });
        message.delete();
    }

    if (command === "sayhelp" || command === "shelp" || command === "скажихелп" || command === "схэлп") {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, значит тебе интересен принцип работы`)
            .setColor("#36393e")
            .setDescription('Команда Say (`скажи`) - позволяет писать от имени Ильича в любых каналах. Данная команда доступна каждому.\n' +
            'Структура команды выглядит вот так: \n' +
            '`4ch say [сообщение]` \n')
            .setFooter("Ильич");
        message.author.send({ embed });
        message.delete();
    }

    if (command === "iluxahelp" || command === "iluxohelp" || command === "илюхахелп" || command === "илюшахэлп") {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, значит тебе интересен принцип работы`)
            .setColor("#36393e")
            .setDescription('Iluxa (`Илюха`) - Команда Ильича, позволяющая отправить смску пользователю с некоторым содержанием\n' +
            'Структура команды выглядит вот так: \n' +
            '`4ch iluxa @user` \n')
            .setFooter("Ильич");
        message.author.send({ embed });
        message.delete();
    }

    if (command === "loxhelp" || command === "losharahelp" || command === "лоххелп" || command === "лоххэлп") {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, значит тебе интересен принцип работы`)
            .setColor("#36393e")
            .setDescription('Lox (`лох`) - Команда Ильича, обзывающая определенного участника лохом\n' +
            'Структура команды выглядит вот так: \n' +
            '`4ch lox @user` \n')
            .setFooter("Ильич");
        message.author.send({ embed });
        message.delete();
    }

    if (command === "smshelp" || command === "mmshelp" || command === "смсхелп" || command === "ммсхэлп") {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, значит тебе интересен принцип работы`)
            .setColor("#36393e")
            .setDescription('SMS (`СМС`) - позволяет передавать сообщения пользователя другому пользователю.\n' +
            'Структура команды выглядит вот так: \n' +
            '`4ch sms @user [сообщение]` \n')
            .setFooter("Ильич");
        message.author.send({ embed });
        message.delete();
    }

    if (command === "askhelp" || command === "ahelp" || command === "вопросхелп" || command === "вхелп") {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, значит тебе интересен принцип работы`)
            .setColor("#36393e")
            .setDescription('ask (`Вопрос`) - позволяет задать вопрос лично Ильичу.\n' +
            'Структура команды выглядит вот так: \n' +
            '`4ch ask [сообщение]` \n')
            .setFooter("Ильич");
        message.author.send({ embed });
        message.delete();
    }

    if (command === "choosehelp" || command === "chhelp" || command === "выбратьхелп" || command === "выборхелп") {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, значит тебе интересен принцип работы`)
            .setColor("#36393e")
            .setDescription('choose (`выбор`) - позволяет выбрать из двух слов одно.\n' +
            'Структура команды выглядит вот так: \n' +
            '`4ch choose [сообщение1] [сообщение2]` \n')
            .setFooter("Ильич");
        message.author.send({ embed });
        message.delete();
    }



    if (command === "помощь" || command === "помошь" || command === "помощ" || command === "помош" || command === "помоги" || command === "памаги" || command === "помаги" || command === "хэлп" || command === "хелп" || command === "help") {

        const embed = new Discord.RichEmbed()
            .setTitle(`А вот и помощь подъехала, ${message.member.displayName}`)
            .setFooter("Ильич")
            .setColor("#1a1a1a")
            .setDescription(
            'Основной префикс бота **4ch **\n' +
            ' \n' +
            '`4ch аватар` или `4ch avatar` - покажу, каким я в последний раз видел вашего друга (может и вас тоже)\n' +
            '`4ch лох` или `4ch lox` - найду того, кто последний раз вас отпиздил\n' +
            '`4ch илюха` или `4ch iluxa` - позвоним Илюхе\n' +
            '`4ch sms` или `4ch смс` - отправлю смс выбранному чуваку\n' +
            '`4ch off` - оповещаю о том, что вы отошли\n' +
            '`4ch on` - оповещаю о том, что вы подошли\n' +
            '`4ch разработчик` или `4ch creator` - подскажу, кто из этой толпы мой создатель\n' +
            '`4ch бой` или `4ch fight` - потренеруюсь с тобой в силе\n' +
            '`4ch скажи` или `4ch say` - горланю анекдоты про лупу и пупу за вас\n' +
            '`4ch мемы` или `4ch meme` - кидаю мемчики\n' +
            '`4ch выбор` или `4ch choose` - выбираю из двух зол худшее\n' +
            '`4ch вопрос` или `4ch ask` - задай мне вопрос ~~(это не пиар аск.фм)~~\n' +
            ' \n' +
            'Если вы не поняли, как действует команда, советую обратиться к таким командам как:\n' +
            '`4ch avhelp` или `4ch авхелп`\n' +
            '`4ch sayhelp` или `4ch скажихелп`\n' +
            '`4ch loxhelp` или `4ch лоххелп`\n' +
            '`4ch iluxahelp` или `4ch илюхахелп`\n' +
            '`4ch askhelp` или `4ch вопросхелп`\n' +
            '`4ch choosehelp` или `4ch выборхелп`\n' +
            '`4ch smshelp` или `4ch смсхелп`'
            )
        message.channel.send({ embed });
        message.delete();
    }

    if (command === "голос" || command === "войс" || command === "голас" || command === "голоз" || command === "галас" || command === "глас" || command === "voice" || command === "sound" || command === "music" || command === "vhelp") {

        const embed = new Discord.RichEmbed()
            .setTitle(`Ммм, голосовухи значит, ${message.member.displayName}`)
            .setFooter("Ильич")
            .setColor("#1a1a1a")
            .setDescription(
            'Основной префикс бота **4ch **\n' +
            ' \n' +
            '`4ch ор 1` - Ты че, дурак блять?\n' +
            '`4ch ор 2` - Вы кто такие, я вас не звал, идите нахуй\n' +
            '`4ch ор 3` - Майнкрафт это моя жизнь\n' +
            '`4ch ор 4` - Лежать + сосать\n' +
            '`4ch ор 5` - Это. Просто. Охуенно.\n' +
            '`4ch ор 6` - Орущий дед опять сошёл с ума\n' +
            '`4ch ор 7` - М, я ем, пошел нахуй\n' +
            '`4ch ор 8` - Ну че народ, погнали нахуй?\n' +
            '`4ch ор 9` - Вот это поворот\n' +
            ' \n' +
            'Аналог данной команды - `4ch dank`:\n' +
            '`4ch dank 1` - bitconneeeeeeeect\n' +
            '`4ch dank 2` - Димон\n' +
            '`4ch dank 3` - Skoopidy Woop\n' +
            '`4ch dank 4` - Смех\n' +
            '`4ch dank 5` - Ты втираешь мне какую-то дичь\n' +
            '`4ch dank 6` - Running in the 90s\n' +
            '`4ch dank 7` - sponge beds\n' +
            '`4ch dank 8` - лютик блять\n'
            )
        message.channel.send({ embed });
        message.delete();
    }

    if ((command === 'em')  && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        try {
            message.delete();
            let new_args = args;
            let channel_id = new_args.shift();
            let message_id = new_args.shift();
            if (!channel_id || !message_id) return;
            let channel = client.channels.get(channel_id);
            if (!channel) return;
            channel.fetchMessage(message_id).then(msg => {
                if (!msg) return;
                msg.edit(new_args.join(' '));
            });
        } catch (e) {}
    }
    
    if ((command === 'ор')  && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        if (message.guild.voiceConnection) return;
        if (!message.member.voiceChannel) return;
        message.delete();
        message.member.voiceChannel.join().then(conn => {
        let disp = conn.playFile('Music/ili4_'+args[0]+'.mp3');
        disp.on('end', () => {conn.disconnect()});
        })
    }

    if ((command === 'dank') && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        if (message.guild.voiceConnection) return;
        if (!message.member.voiceChannel) return;
        message.delete();
        message.member.voiceChannel.join().then(conn => {
            let disp = conn.playFile('sounds/ili4_' + args[0] + '.mp3');
            disp.on('end', () => { conn.disconnect() });
        })
    }

    if ((command === 'konnor') && ['327872942124040192', '421030089732653057', '361951318929309707', '222746438814138368'].includes(message.author.id)) {
        if (message.guild.voiceConnection) return;
        if (!message.member.voiceChannel) return;
        message.delete();
        message.member.voiceChannel.join().then(conn => {
            let disp = conn.playFile('sounds/konnor.mp3');
            disp.on('end', () => { conn.disconnect() });
        })
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}, детройт значит?`)
            .setColor("#1a1a1a")
            .setDescription('28 УДАРОВ НОЖОМ!\n' +
            'ТЫ ДЕЙСТВОВАЛ НАВЕРНЯКА, ДА?!!\n' +
            'ЭТО БЫЛА НЕНАВИСТЬ?\n' +
            'ГНЕВ?\n' +
            'ОН БЫЛ В КРОВИ, УМОЛЯЛ О ПОЩАДЕ, НО ТЫ СНОВА И СНОВА НАНОСИЛ ЕМУ УДАРЫ!!!\n' +
            'Я ЗНАЮ - ТЫ УБИЙЦА.\n' +
            'ПОЧЕМУ ТЫ НЕ ПРИЗНАЕШЬ!?!??!\n' +
            'ПРОИЗНЕСИ: Я. ЕГО. УБИЛ. ЭТО ЧТО, ТАК СЛОЖНО??!??\n' +
            'ПРИЗНАЙСЯ ЧТО УБИЛ!! \n' +
            'ПРИЗНАЙСЯ!\n')
            .setFooter("Ильич");
        message.channel.send({ embed });
    }

});


client.login(process.env.TOKEN);
