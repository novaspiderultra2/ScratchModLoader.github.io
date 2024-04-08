const assets = {
    block: "999a77dc64a8c4c37e29d2d26ad45737.png",
    pickaxe: "5ccbea0f874664d49b44b67cb0897cd5.png",
    mask: "06a5d27fddeeeeafb6aa3b532422250a.png",
    door: "2be54e296826faeee00c28af84d6c27e.png",
    potion: "2d1f80466ea0288a00e2e01df19ed01b.png",
    torch: "9d710f2e694d204fdf35678850653beb.png",
    chest: "6d2752f72c580f3ae8f1f3aa088acc24.png",
    object2x1: "f2c8be1e6819d92f2399347a7ac8160c.png",
    object1x2: "27b687c370854241c30b5cc6021e64a1.png",
    object2x2: "3389c5990450aa8aeef2202c15a198ac.png",
    bookcase1: "bdcdf283287b49cdad21bbacb55f49b4.png",
    bookcase2: "f7da4112f2c62f8175638653da1b2f80.png",
    bookcase3: "660a62a19b7a3e0b9cf803ce5e6b572c.png",
    bookcase4: "2482df961e37cf2baaa59760554134b6.png",
    bookcase_item: "ff334c9b8c12a766d9e04d67b6d93a32.png",
    npc: "2f3c462b5e8ce9c4eecba58fd65c3483.png",
    craftingRecipe: "1c7a1d7d38f1d9d7b4d3227f197beb40.png",
    other: "d196bfd105485f57a3ff48b795bef642.png",
    javaScript: "0cded3a3276425911d55a2552bf361bf.png",
    paintBrush: "0acaede5cd13b6049a41e2f22c5dbb38.svg",
    dirt: "85c0fe775a65f8d4272fc329073dc613.png",
    trash: "710a6ef1048f968401b16a6b9eb07773.png",
    axe: "8a3de2f9955f6a17be0d6fdcd482e63d.png",
    sword: "e571bffc4d611cd13ddccd713cf81ff7.png",
    staff: "68ca074dbb53f6a8bf7621ebc1c91bee.svg",
    beam: "c01129a7283a29e7631d5654c8f0d653.png",
    trashBtn: "710a6ef1048f968401b16a6b9eb07773.png",
    zombieArm: "b6b22cb0ab0f8c52bdd625a7c85c0520.png",
    head: "e682a401da2bae8293ca2f108d4f1ed4.png",
    "rabbit1": "2f3c462b5e8ce9c4eecba58fd65c3483.png",
    "rabbit2": "744bf0c254530866edb442cf3a519140.png",
    "rabbit3": "64efeaf66d1890bce7a73cb51f1879a2.png",
    "frog1": "4354c5895e3350a2a5bc50ad78595089.png",
    "frog2": "289603f70519ca76e7e790a49506d2a3.png",
    "frog3": "92343ec2d63913d092d87e6ace62d70d.png",
    "slime-green-1": "698359608402d9d9a07c3685dd9c0b06.png",
    "slime-green-2": "b652b14e127ba0f87acef4b8df38d65d.png",
    "Demon_Eye": "9ea36789adf1c2d54f32a270cdbdff3d.png",
    "zombie_01": "8d7c51f9a8cd6444b84ef33e82fac994.png",
    "zombie_02": "fabadd056aeae709902458b878148c14.png",
    "zombie_03": "250c97f5276bef2b2068b34dd9b93063.png",
    "crab_1": "5f08736e22cd3117330d9a12e25de2ed.png",
    "crab_2": "31af06cd44bba1d398317eb2c9723b99.png",
    "crab_3": "63ec18ab7aadba8ed01fcde7f3c41665.png",
    "goldfish": "1c905bf540677b588b713807b444ccbc.png",
    "goldfish2": "960a58b283894332071a33f624701d8b.png",
    "goldfish3": "cc4a3d754ca3c2269a6e124e7c5b2fcd.png",
    "jellyfish": "aeb3771b722c8917ebf8cad9c0839d6a.png",
    "jellyfish2": "362c53e9461eea8d52b542925a6f6b68.png",
    "jellyfish3": "c909051321f056ae6869fa37166bcb7c.png",
    "bat4": "423ce0744a13eb16957b3fc7348eaca0.png",
    "bat": "632216ce59020a2a0d65cc12013d2db4.png",
    "bat2": "2a3feeee2355f78655aba4b1ec7221f5.png",
    "bat3": "5c4212d626f5e1ddf14789d1b9747549.png",
    "bird": "c136b0a0c9cf426ce71897b8f3a34f70.png",
    "bird2": "f6f95d687c2c094268fd2115400123d5.png",
    "bird3": "7b6e6161bfdcb86ffc03e670b4f27112.png",
    "bird4": "c72d190f950491fe63cce7447309c8ed.png",
    "pyrana": "ee322f40273c3e7e5bcef517c78f399f.png",
    "pyrana2": "9e38e25c37f5520893050bcf962b2a9f.png",
    "pyrana3": "cad41e976ffe952dd2d988e71e8491a9.png",
    "slime-purple": "26d28677d8bcb8e126282fc9ff6087ca.png",
    "slime-purple2": "c466113602821c2068df0c474d2eece2.png",
    "slime-blue": "04044dd3f4f1cc3d8863b88bc0c14da3.png",
    "slime-blue2": "d351ba633a244905f0636ecd0544f44b.png",
    "shark": "989635aebf2bf4cca93b10cb58286160.png",
    "shark2": "59015f65469eb1e2bf5ebd2136426fb3.png",
    "shark3": "989635aebf2bf4cca93b10cb58286160.png",
    "shark4": "4c3df6e38533cc89da137665d1e9e5a0.png",
    "bunny-slime": "9ae8a630958822e9dab634502a271cca.png",
    "bunny-slime2": "9a298ad8eb4d5296cedbe353278ac2c0.png",
    "lava-bat2": "bbbd37e0dd809b474c7a3f4525192a65.png",
    "lava-bat3": "94dff28c89ba452e7504cc3597c128ee.png",
    "lava-bat4": "84121e8d62871664f364cb92587a93b7.png",
    "lava-slime": "1e7fe85e1670de004ff98e36a676bbcd.png",
    "lava-slime2": "6488f99379bebea5f973d476308e95b6.png",
    "Butterfly1": "a5fd11959551d61d0d7e14706dc40f8f.png",
    "Butterfly2": "38ee62168f7c2e3d6fe54671d1b172a3.png",
    "Butterfly3": "220ed2ab828b9374c9361a419ac26cc5.png",
    "SquirrelW2": "42f4c0f7760f7a652926e89f3250574e.png",
    "SquirrelW3": "d15bcb8c4bcad6e4880de435ee0f6353.png",
    "SquirrelW4": "08a071dbc043403d8903dadec385e61e.png",
    "SquirrelW5": "ca8d6dee3771522222b8f506e154db7f.png",
    "SquirrelW": "67e7b45ae0c7a204f8c5931e07e18531.png",
    "mouse2": "a409057e6ed81084f6df133a1c71dc87.png",
    "mouse3": "795b6cab721e33145e23f9cfa21399ca.png",
    "mouse4": "a409057e6ed81084f6df133a1c71dc87.png",
    "mouse5": "fb0052ffdea7074632731a42135c3d12.png",
    "mouse": "633ef31480b1eb0cba42705b0000b821.png",
    "Firefly": "ad229e3dbfc63ec58c652ac0f4909f11.png",
    "Firefly2": "7533f9a21466065781d0e7f03c7e15de.png",
    "Firefly3": "6bd914498888315165a5324e4ce2313c.png",
    "Eye-of-Cthulhu": "d1606fdf99b7aa4d291f4206f69300b6.png",
    "ITEM_SquirrelW": "67e7b45ae0c7a204f8c5931e07e18531.png",
    "ITEM_goldfish2": "960a58b283894332071a33f624701d8b.png",
    "ITEM_rabbit1": "2f3c462b5e8ce9c4eecba58fd65c3483.png",
    "ITEM_slime-green-1": "698359608402d9d9a07c3685dd9c0b06.png",
    "ITEM_zombie_01": "3d4a56c7c04dd34b014e7d67e0ee04bb.png",
    "ITEM_bat": "632216ce59020a2a0d65cc12013d2db4.png",
    bed_item: "e681dedca85199b201c5a4a79c6bb5f6.png",
    bed1: "9123c9b572f4d69bd49308b818b65895.png",
    bed2: "985eb6ec935f5b12866f47ab8cf0da7e.png",
    clock_item: "c474ee57b38ab795345340a7e1d0b537.png",
    clock1: "2ed18779b8a70065804eaffd18b31b05.png",
    clock2: "97c836591b8512448aa569de31ed5d9d.png",
    door_item: "d80b3c5b4f9b385000b06974fbe5ebd7.png",
    door1: "922ee80d60ea66f5edc3f5bd2f4f999b.png",
    door2: "d7782ccce3484fc72a7ca41190b9de30.png",
    door_open: "2be54e296826faeee00c28af84d6c27e.png",
    chain: "973cfab893b08ddf06613b58348d3067.png",
    platform:"2312ad91f2dad4a34958ea0ac8f0236b.png",
    beam_top: "4d8024b500756cf7784f840732cf0833.png",
    fence: "82d70787a7bbf33ea6283e54d30aa876.png",
    "torch_left": "06b1b29e3307a2017bf30c8cf2d17412.png",
    "torch_right": "942de10e0f4b9230c288a14b5b0d9461.png",
    chain2: "2c026634f54bc4f799daa73d7628a95c.png",
    "ITEM_DiamondStaff": "68ca074dbb53f6a8bf7621ebc1c91bee.svg",
    "Projectile1": "4db4ae82cba3a3afb045378d28a529b1.png",
    "Projectile2": "4f08fb3f7163cf527e3dea6bf66e37c1.png",
    "Projectile3": "36f8614ed0f8031788f41f1fe3ab5948.png",
    "DiamondStaff": "8173b8094d2307e7ec4306aab5c76b36.png",
    "Barrel": "4f2c9446340e93baa05e4b4cdc608bb2.png",
    "ITEM_table": "2f9adacdfd7457715ab80818d9bf2641.png",
    "table1": "f6e763d3c84f6bc5027976a56eaf2cc5.png",
    "table2": "d6edf356ba9495284820447ccf58981c.png",
    "chair_left": "4eb4a45670bcf59d0b6c79f850082d84.png",
    "chair_right": "f4a5dc82a52116edb343a4f28e14608c.png",
    "goldChest": "2ff95983ed7dc51bcb4e7d1756a4697f.png",
    "worldGen": "fb6d52a94a431b0d3111fa871001e6f1.png",
    "logo": "a495179c2afaf32be5b6d6663322addf.svg",
    "thumbnail": "313a2f6dc464184effee4d00886e4f3b.svg"
};
var NPCClass;
(async () => {
    for (let key of Object.keys(assets)) assets[key] = await ReadAsDataURL(await (await fetch(`https://cdn.assets.scratch.mit.edu/internalapi/asset/${assets[key]}/get/`)).blob());
    NPCClass = {
        "1": {
            name: "Hop",
            images: [assets.rabbit1, assets.frog1],
            frames: [
                {
                    "name": "Frame1",
                    "rotationCenterX": 14,
                    "rotationCenterY": 24,
                    "dataFormat": "png",
                    "image": assets.rabbit1
                },
                {
                    "name": "Frame2",
                    "rotationCenterX": 16,
                    "rotationCenterY": 24,
                    "dataFormat": "png",
                    "image": assets.rabbit2
                },
                {
                    "name": "Frame3",
                    "rotationCenterX": 14,
                    "rotationCenterY": 26,
                    "dataFormat": "png",
                    "image": assets.rabbit3
                }
            ],
            item: {
                "name": "Item",
                "rotationCenterX": -2,
                "rotationCenterY": 28,
                "dataFormat": "png",
                "image": assets.ITEM_rabbit1
            }
        },
        "2": {
            name: "Slime",
            images: [assets["slime-green-1"], assets["slime-purple"]],
            frames: [
                {
                    "name": "Frame1",
                    "rotationCenterX": 16,
                    "rotationCenterY": 22,
                    "dataFormat": "png",
                    "image": assets["slime-green-1"]
                },
                {
                    "name": "Frame2",
                    "rotationCenterX": 14,
                    "rotationCenterY": 24,
                    "dataFormat": "png",
                    "image": assets["slime-green-2"]
                }
            ],
            item: {
                "name": "Item",
                "rotationCenterX": 0,
                "rotationCenterY": 25,
                "dataFormat": "png",
                "image": assets["ITEM_slime-green-1"]
            }
        },
        "3": {
            name: "Angry Slime",
            images: [assets["slime-green-1"], assets["slime-purple"], assets["slime-blue"], assets["bunny-slime"], assets["lava-slime"]],
            frames: [
                {
                    "name": "Frame1",
                    "rotationCenterX": 16,
                    "rotationCenterY": 22,
                    "dataFormat": "png",
                    "image": assets["slime-green-1"]
                },
                {
                    "name": "Frame2",
                    "rotationCenterX": 14,
                    "rotationCenterY": 24,
                    "dataFormat": "png",
                    "image": assets["slime-green-2"]
                }
            ],
            item: {
                "name": "Item",
                "rotationCenterX": 0,
                "rotationCenterY": 25,
                "dataFormat": "png",
                "image": assets["ITEM_slime-green-1"]
            }
        },
        "4": {
            name: "Fly",
            images: [assets.Demon_Eye, assets.bat, assets.bird, assets["lava-bat2"], assets.Butterfly1, assets.Firefly, assets["Eye-of-Cthulhu"]],
            frames: [
                {
                    "name": "Frame1",
                    "rotationCenterX": 16,
                    "rotationCenterY": 10,
                    "dataFormat": "png",
                    "image": assets.bat
                },
                {
                    "name": "Frame2",
                    "rotationCenterX": 14,
                    "rotationCenterY": 6,
                    "dataFormat": "png",
                    "image": assets.bat2
                },
                {
                    "name": "Frame3",
                    "rotationCenterX": 8,
                    "rotationCenterY": 8,
                    "dataFormat": "png",
                    "image": assets.bat3
                }
            ],
            item: {
                "name": "Item",
                "rotationCenterX": 0,
                "rotationCenterY": 26,
                "dataFormat": "png",
                "image": assets.ITEM_bat
            }
        },
        "5": {
            name: "Walk (Aggressive)",
            images: [assets.zombie_01, assets.crab_1],
            frames: [
                {
                    "name": "Frame1",
                    "rotationCenterX": 16,
                    "rotationCenterY": 44,
                    "dataFormat": "png",
                    "image": assets.zombie_01
                },
                {
                    "name": "Frame2",
                    "rotationCenterX": 16,
                    "rotationCenterY": 44,
                    "dataFormat": "png",
                    "image": assets.zombie_02
                },
                {
                    "name": "Frame3",
                    "rotationCenterX": 16,
                    "rotationCenterY": 44,
                    "dataFormat": "png",
                    "image": assets.zombie_03
                }
            ],
            item: {
                "name": "Item",
                "rotationCenterX": 0,
                "rotationCenterY": 37,
                "dataFormat": "png",
                "image": assets.ITEM_zombie_01
            }
        },
        "5.5": {
            name: "Walk (Passive)",
            images: [assets.SquirrelW, assets.mouse],
            frames: [
                {
                    "name": "Frame1",
                    "rotationCenterX": 24,
                    "rotationCenterY": 22,
                    "dataFormat": "png",
                    "image": assets.SquirrelW2
                },
                {
                    "name": "Frame2",
                    "rotationCenterX": 24,
                    "rotationCenterY": 22,
                    "dataFormat": "png",
                    "image": assets.SquirrelW3
                },
                {
                    "name": "Frame3",
                    "rotationCenterX": 24,
                    "rotationCenterY": 19,
                    "dataFormat": "png",
                    "image": assets.SquirrelW4
                },
                {
                    "name": "Frame4",
                    "rotationCenterX": 22,
                    "rotationCenterY": 26,
                    "dataFormat": "png",
                    "image": assets.SquirrelW5
                },
                {
                    "name": "Frame5",
                    "rotationCenterX": 18,
                    "rotationCenterY": 30,
                    "dataFormat": "png",
                    "image": assets.SquirrelW
                }
            ],
            item: {
                "name": "Item",
                "rotationCenterX": 0,
                "rotationCenterY": 30,
                "dataFormat": "png",
                "image": assets.ITEM_SquirrelW
            }
        },
        "6": {
            name: "Swim",
            images: [assets.goldfish, assets.jellyfish, assets.pyrana, assets.shark],
            frames: [
                {
                    "name": "Frame1",
                    "rotationCenterX": 14,
                    "rotationCenterY": 18,
                    "dataFormat": "png",
                    "image": assets.goldfish
                },
                {
                    "name": "Frame2",
                    "rotationCenterX": 16,
                    "rotationCenterY": 18,
                    "dataFormat": "png",
                    "image": assets.goldfish2
                },
                {
                    "name": "Frame3",
                    "rotationCenterX": 14,
                    "rotationCenterY": 18,
                    "dataFormat": "png",
                    "image": assets.goldfish3
                }
            ],
            item: {
                "name": "Item",
                "rotationCenterX": -2,
                "rotationCenterY": 28,
                "dataFormat": "png",
                "image": assets.ITEM_goldfish2
            }
        }
    };
})();
const tileIcons = ["999a77dc64a8c4c37e29d2d26ad45737.png","85c0fe775a65f8d4272fc329073dc613.png","044f7524b81dc340011b92166b227ab3.png","b9ef48185a94cbf108f6748fe0b8f8bc.png","b34c1a812b0d2a7a77a5dbf659a38d5e.png","1bdd4a9310dbffc1cc1b8d96fc8a3596.png","78a9cea1747bc7b095cdfcb952a7a3bd.png","7ccbea4943ce2d48fcd4a1f50491c9d9.png","89ec1473da8832d3162c819a7a55a4ea.png","cf5fb8545664b66b10a22e3e95bbeff2.png","a008b73290df48bdd642503c72f27dff.png","45eae168ce2422b57d8744af14c620cc.png","3374b869244f880c19c19bc1d9dfdd15.png","c18b1620d7c3e6fbd88a26ed9ac1d72f.png","689c644a40ae0fd79ddfe08b3a2409ae.png","eabe692d80ef8f051de304b6f7097575.png","f0025dc271a77c7167b65256b2ba329f.png","5828335f81b5a99028f91769c4a6e156.png","e99ef984eb5bf2e4f38c222a597b3699.png","b1404d2ce1202a401f36e6a099794f65.png","43ae2019898d42c071aab7effff526d8.png","5ccbea0f874664d49b44b67cb0897cd5.png","8a3de2f9955f6a17be0d6fdcd482e63d.png","80654e0d9c4df06235296d92750c4f67.png","8bb2ffb3c27ff6894c690fd3a108c7f4.png","976bc9c0a37d724a029f6cdc4d305b68.png","c8c333cec04d6744ff9afe5fd2dcc5b7.png","2f8e97a479e4d647836698e32876cc74.png","c78e498cfc37a4ec2b2b0f282eaaeb6d.png","e681dedca85199b201c5a4a79c6bb5f6.png","94d7603239dbc1fd7a754aca99a94cd7.png","036761fb86f00fd046294f258917a747.png","922ee80d60ea66f5edc3f5bd2f4f999b.png","d7782ccce3484fc72a7ca41190b9de30.png","d80b3c5b4f9b385000b06974fbe5ebd7.png","2312ad91f2dad4a34958ea0ac8f0236b.png","1c7a1d7d38f1d9d7b4d3227f197beb40.png","b1c8817a8a273e2a34cfc2d289dc5dfb.png","b2ddf5a3b334d557932f4cd51ce5c799.png","2586ca49309954bb371ecd6d41bc2d32.png","0d0275d6b50e583d2d3b74ae4557abe8.png","a23e76e4e521a80d07429f819e74a1bd.png","9123c9b572f4d69bd49308b818b65895.png","985eb6ec935f5b12866f47ab8cf0da7e.png","4eb4a45670bcf59d0b6c79f850082d84.png","f4a5dc82a52116edb343a4f28e14608c.png","9d710f2e694d204fdf35678850653beb.png","06b1b29e3307a2017bf30c8cf2d17412.png","942de10e0f4b9230c288a14b5b0d9461.png","10c4baf94acdb92667e169de65b5bd18.png","db26b75db48d7ab59afb04ad81e8300e.png","8340a207fe7b19bfaced26c0b55174ef.png","df4fc9a34598d1ef97b55c0ccf885591.png","0fc740369fba932676951573582ca8e2.png","2f9adacdfd7457715ab80818d9bf2641.png","4f2c9446340e93baa05e4b4cdc608bb2.png","6d2752f72c580f3ae8f1f3aa088acc24.png","d3f3b97ddfd39313076326c33a0c6b9a.png","50c520f7a426063d2be2609304375774.png","20641905497d1c5e1302b08581e79c3f.png","973cfab893b08ddf06613b58348d3067.png","c474ee57b38ab795345340a7e1d0b537.png","2ed18779b8a70065804eaffd18b31b05.png","97c836591b8512448aa569de31ed5d9d.png","6ffb7a317d70e9705bdc14efcdb174d9.png","46cc19d78ec558d73722bc3f6837b916.png","c8ea3173b1ef2227181f958694f37ffa.png","be0d1a18812781d5866ed205f57f1308.png","15b1939f450d4a1ba2012d89c4a85811.png","ed08a693942e01001f14dba6b0ac3aca.png","e9b34f779f41d40e0c00374d0ce91b57.png","5b069f2bcc0405b6b3c749fe3e3ea6e2.png","4030086eda5f1108e06882b28317edc8.png","93db0a3d7b551281f98c94152d5a74d5.png","a34b65bfaeabd6614fdf2d9420c74433.png","3f4fbacc5dae9b8407dd4e2c5fe3e451.png","a5cee8d3bf547224993c74396dfba297.png","b6b37939b71d4923ff9de68458631cac.png","ca0e8af046bc12032872589c8435f618.png","8a30b8ecd2e9ac56d9498c79e418b4b4.png","78f4db6f8d1d5a400678070f49177d67.png","b1c0027aeb2f0a0fd2845065194aef07.png","ed0b7f813782bff1d8fa31df98e07fc5.png","14795ef1c542b2a8f14480f637429d83.png","cf2f8c366c9bd47cb428e375d869a7cd.png","7d906b0972651ff89b3a535df34d7980.png","65230535de264b962a39d6bf6dade300.png","0be6ce30ffd311bd6fbe6690c94088cc.png","73a28b23733571457d5cce425fe351be.png","87b672fe15d5297691229eec059ac96c.png","c183b119e27082e50341f02ef5bc9b54.png","76bbf0c8022ec78a85a69acd70a0b470.png","2b7dbb32e82c8a9298eca8656abe5fe5.png","fd1c3027c652d3f80fc88b951fdf798e.png","b6b9d7b9df3dd5fd93651ceba4b38970.png","82d70787a7bbf33ea6283e54d30aa876.png","5f5a7b8930dff12b75ef6a61463a694c.png","702bdf88ec6b77e9ba938202dbe3eba4.png","73a188fa2b302ef11985e40453ec68b8.png","2ff95983ed7dc51bcb4e7d1756a4697f.png","22d9c509a4af87292b1219550630cf65.png","7e0a8e92b781c1d601753ffc6a65716e.png","1da5229c834264ff27a5ad8c6671a9cb.png","6f70583c573d64da2e54f42644313120.png","e866a793519d408a793dcfb40bd95c84.png","9e9895973706459a31d0ade74d6efe57.png","423c026cd86c560bbe5e14336e6cc4a5.png","bcb1f778a04bc2d680b1f9484f4d763e.png","e512da1f74f01e0215e6371d0bb2f26f.png","42459e1aed561f0b5e48f69353e93693.png","c0f53c58897ef2722a0b76a4ac8e7cc9.png","6b925cf51b72cfde3194461a1f467ec3.png","19231269abb4e5c6813a4e5e8fb29547.png","d3fc897040ca9047cede8e93e2873063.png","58103cc7b95cfe676df042bb5a573d05.png","aabc16e798259c69acf0484556ef5a14.png","bdcdf283287b49cdad21bbacb55f49b4.png","f7da4112f2c62f8175638653da1b2f80.png","660a62a19b7a3e0b9cf803ce5e6b572c.png","2482df961e37cf2baaa59760554134b6.png","ff334c9b8c12a766d9e04d67b6d93a32.png","26d12371abe4bae639e2715db8586250.png","fd10ec891ded8c60071189e1cddd2a42.png","7197d876228a7730ade75a211d854fa7.png","2f3c462b5e8ce9c4eecba58fd65c3483.png","4d8024b500756cf7784f840732cf0833.png","c01129a7283a29e7631d5654c8f0d653.png","d244c8150335f94dcc3ca73cb68c162a.png","a785915aeb4a43e251efd49011fc9594.png","498a673070f4e9536993eaac077ae153.png","6638baf6ff43bbf14b647dfebace4770.png","092c66038386435a3685649d580ed62b.png","7716b61cde552cef26c57d6a4d0cd695.png","2c026634f54bc4f799daa73d7628a95c.png","4354c5895e3350a2a5bc50ad78595089.png","698359608402d9d9a07c3685dd9c0b06.png","6bd3f8eef60311e1e2b0c12385bb8c06.png","e571bffc4d611cd13ddccd713cf81ff7.png","d196bfd105485f57a3ff48b795bef642.png","4ff579223bf793bf4c9dabec0c3e2db3.png","60e50d6ebf7e41fc32d1dc8d9bba49ae.png","72007efc967af5a85d8fd369479599d9.png","688bd2302eb0d26afaa5b5e92f7d9fe9.png","5305563e3e3b27a1c617eebfd82e2557.png","83964bca92b4c73510b681516f621b1a.png","66978225153b252ee792e5265280d6a7.png","d25ba44d84d6392d3158dc442ad31359.png","5227f90d439a0ba87eeea81689b0a69c.png","9ea36789adf1c2d54f32a270cdbdff3d.png","22dad5725a1e38bc94f2fe55faf47274.png","3d4a56c7c04dd34b014e7d67e0ee04bb.png","460895f4c711d134062d53530979a336.png","e2bae4f63c60666851110d8fcf80e27b.png","55702da8676c74ca38c3703560171ca9.png","7c56db34d6f468018453dda609c17797.png","31af06cd44bba1d398317eb2c9723b99.png","76f34da83a98178088d5ef6814c5a08f.png","5d421c0dad386edfeb3ddf1d7f5b19bd.svg","68ca074dbb53f6a8bf7621ebc1c91bee.svg","ea23f6f073207349bfc579003762a600.png","85b0fa6cabf05179c6998a6e8efa97e5.png","f369b6e40b6e69f641942e072ea32f5f.png","92779e7e1de3b408765114b7d0f44674.png","15a6a112d5f7b798d26f24940cbae579.png","1ec5c96f38a1868e57b5dcfe0787e2f4.png","5f6ca2a19776ad9c544e2e94601becd1.png","93010e195c92d48708a7a294871b8c38.png","1dc1a0c452262f559964b7f929e86b46.png","659bdde372a848889c599712c3950121.png","a8d68a4aa6f1181e2b3097bacdc8a4aa.png","1fd7d0ff843db5afc074b754c2b6f3ce.png","91437335497c5829d43faa0235825a3f.png","e00e47020ccf4d71145db8ec2fb83f17.png","5d0c9d13362d7da3874caad89b3d1dcb.png","e2c0c0a3cf9c896b0af8920863fe58f7.png","960a58b283894332071a33f624701d8b.png","b819a67acb365651612f404df30e79fc.png","04df5085b067c2a4b44b100f71462543.png","c5423526f8c329342f5356a9f5494187.png","3c52408e5a58de5439cb3b88f2f7b515.png","1ee4d306950f35c9bc33a0ec4eac6f44.png","a2c17a4d0bf6ca81b19eac9e93787a5b.png","56ee7b2e4fb9571edb8e5d9260762313.png","9f22b5c9fd2ff87d3c44f3027bee370c.png","572604a60277b935306fce40ed8435fb.png","4089e2175dbe7eb24ed57d93332fcf46.png","e3b59d956f0e93361ad548319f062c62.png","6316e3f4a45811e4be79994475a72c04.png","984ec5f669c303b4928e30e50f0a4398.png","e1f35d9cc51d49f2c847ce238f8a1dd0.png","5c5cf4a089056ae6e45bf3195c8f6c1b.png","1bb492ff43e41b94ca19ccc5783bc9cd.png","f9ba7a3e67f04d234a44bfb9bfc513d1.png","5aefc841a0fe64399932f124fb52f401.png","2d1f80466ea0288a00e2e01df19ed01b.png","b41078dce3c6539ef300a326326d4986.png","af1b63ffe0d823c58769e3e133441222.png","bab5280f82dd0f98455b68ff40a67452.png","8e5bd74eedef0bde11eaad8add496592.png","cb54d25cceb2ee742d9aa45388bdf434.png","d8b35522881855e725d5dfd7fab608a2.png","26d28677d8bcb8e126282fc9ff6087ca.png","9ae8a630958822e9dab634502a271cca.png","04044dd3f4f1cc3d8863b88bc0c14da3.png","1e7fe85e1670de004ff98e36a676bbcd.png","ee322f40273c3e7e5bcef517c78f399f.png","d0fc4457f9ab20ae3ee8e4e2cb8b9c31.png","1d0970aa070774f81952389afff18f39.png","009a024c55dd26f34b2680bde7782263.png","b6b22cb0ab0f8c52bdd625a7c85c0520.png","7289839e835facd576f8a13ae027cfb3.png","2494e6ec470ee384aa900cfd91659d76.png","c31734f8ee6abdbd893f26903cc43de5.png","c1c019725d155b620bd85b3aa9f40117.png","8de3e6a031f3b6eef93f714da59b4adb.png","67334c8d636206caae0655fa179b6888.png","d5a91258ee425582eb87531d6dc2c76b.png","690f395a201d0dc6b70eec32f56e2c9b.png","47de68f6f9fc80e81874419b1c15ec1c.png","5d4880d53217d0458b5dc7d6e572e6de.png","b3c6dc6a56652d0565c7dbafabb77297.png","632216ce59020a2a0d65cc12013d2db4.png","bbbd37e0dd809b474c7a3f4525192a65.png","727f1b05846d7ab82c41aec1cd19e6c2.png","cc8b57d686e7217662533f58fc2924a9.png","d924d708b8741cf682f61eeebc9b9ac1.png","f9e227ce850acf090658c6d3c5cc97fd.png","045246124660ac85503987986dea2620.png","d5d7630277329e13946f7d62511997bd.png","fa21d51954d66ff1bf37c76fae4081e1.png","e1399ea741b4347f45998a23dd6cdb89.png","4189a76abe14b00be99c4ed738e4cf92.png","75f394e61b015d62b7c7f357886ae548.png","dbd66e1773325fc143d3607d3ca93b3c.png","eaa9915d45a2a5b1954b55ff2711b1a1.png","f70345659ec46586884ad6122a686210.png","60fdf985135f836046a41aaa30661db5.png","eb6593ecd65b87f27e3655e38765b304.png","44f1fbae468f5f84e13eb858838e10f7.png","194f424296fda24dc0fbedaff46d73c4.png","1e9d5593c06e1048c4bf84b44ab7a852.png","34cb16017f6481c6b9c4f5b49927784f.png","29bb025769b054965e530d0bcf6de0b0.png","7967543bf8ae6ce84ae4f7737239e575.png","6934c86495cad980507878be8e30d076.png","2a72307a9043493c5f870df3d76e6b5c.png","6850a344d4ffe3da7afc4a96ecce3f61.png","6148e9a52ec7fe266a68993c24c25742.png","d0492b0d8129e5637dc527192ab723e2.png","1e0546ba52c6453da3ffe2b58cdf17d4.png","075216cd7e9285194fc74e69a2825631.png","b3400d9c6fc33c37de87730aeba1f5e5.png","8682ca885284e03da37245e0014850d1.png","b526d81c852f83cb24d7a8682ef03314.png","1e07f6e86d2ad1762d99a3bb59aa1c2c.png","67e7b45ae0c7a204f8c5931e07e18531.png","8a97182e24416328506400690692652a.png","d145c18072a7cf1062ebc5e2a168832e.png","daf2c1527e74f64164176351f56ac843.svg","5452c8599b96b5c764804b7a5ff47a6f.png","be930f96fe9130f17969c9828312eb33.png","763397d74c957e248bcb4d9911d39b31.png","be63831e2183055ac65c80689773a1b7.png","adf4fb8ed54dc34064bf10df2943367e.png","8304c57f23fe80eba09799627c83c0e2.png","2fb57f4a73eafcd4cc3f316ebc9e6a35.svg","397638d8747152125602a89bb2d8afae.png","c2ebfd58a017ecc996e4b1d9a8bfcda1.png","0a11e04427a014d82f1d4c391fc1f561.png","32d33e8c42843a16e6039fddcd2e3f26.png","cad0c9a3af2668b3f2bb5844b447e66b.png","47136392c8ce2e8f63cafb524e540e08.png","38939150955d78469c151c18231243a3.png","515a6eb940e386a4493f2dbeef73e5d3.png","84038069bae3faadcdadbf931f4fbd30.png","f6e763d3c84f6bc5027976a56eaf2cc5.png","d6edf356ba9495284820447ccf58981c.png","597f21627570d353f713b23761e4a562.png","ca6ff9e684336579036576d2584711c5.png","cff934007326c033e385aa466e5b0abb.png","530f6150ebfd7e6e63f63f1b4beaa09f.png","3ede712232c337ad19567c24ec5e357f.png","24750b2f3fe99a3c84ba9b5fdbb1e2ed.png","a38efa831215d00e579548480c3b77b6.png","1f38015084fcf554da103e7628a8579b.png","f94dfbbe048416aa8e5257e3f2ae56b0.png","f3ca157856434654de61be08585c5cfc.png","011dba80ca5e4a932f4aa34f17e9c186.png","757ca1ff61e3842186ea0c6fe15e6c98.png","0aa71c02423a0429c261fa124905bc6f.png","1e2b1b86856e0a333ac187085bc24860.png","89cf45c082aabc54e28ebcf2733e2e91.png","660b339de479e055f756c5eeb7d89fa1.png","19ddf3ea1fead7d5da86b97c96df16a7.png","2f978d6428d6ac73764ad25a2973cae6.png","3e4326f9eb0ebb7024bbcb8f3d2c00f3.png","70e53f0941657e69b955bde3459f6f99.png","ed698138aafe3b5a481b1561e8d4563b.png","06a5d27fddeeeeafb6aa3b532422250a.png","b026c0ada4b154fc0b599048540bf810.png","b2854016a6123a359d95d9bfa46b9b7c.svg"];
function getTileIcon(idx) {
    return new Promise(async resolve => {
        if (!tileIcons[idx].startsWith("data:")) tileIcons[idx] = await ReadAsDataURL(await (await fetch(`https://cdn.assets.scratch.mit.edu/internalapi/asset/${tileIcons[idx]}/get/`)).blob());
        resolve(tileIcons[idx]);
    });
}