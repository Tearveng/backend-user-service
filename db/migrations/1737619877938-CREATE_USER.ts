import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATEUSER1737619877938 implements MigrationInterface {
  name = 'CREATEUSER1737619877938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL DEFAULT '', \`password\` varchar(255) NOT NULL, \`profile\` varchar(255) NOT NULL, \`publicId\` varchar(255) NOT NULL DEFAULT '', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`
        INSERT INTO users_entity (id, firstName, lastName, email, phone, password, profile, publicId)
            VALUES 
       (1, 'Guntar', 'Douglass', 'gdouglass0@psu.edu', '256-142-0971', 'asqwe', 'https://robohash.org/etlaboriosamaspernatur.png?size=50x50&set=set1', '68788-9017'),
       (2, 'Basilio', 'Misken', 'bmisken1@addthis.com', '655-585-7038', 'qeqwr','https://robohash.org/estdistinctionatus.png?size=50x50&set=set1', '49349-007'),
       (3, 'Karlik', 'Hulance', 'khulance2@angelfire.com', '302-932-5900', 'asdasd','https://robohash.org/eiusquiadistinctio.png?size=50x50&set=set1', '64009-331'),
       (4, 'Jammal', 'Tunnow', 'jtunnow3@unicef.org', '325-124-3166', 'fasf','https://robohash.org/ullamomniscorporis.png?size=50x50&set=set1', '21695-264'),
       (5, 'Allan', 'Knappe', 'aknappe4@oakley.com', '792-600-7930', 'asfvcv','https://robohash.org/odiovoluptascumque.png?size=50x50&set=set1', '0220-1109'),
       (6, 'Sayres', 'Ziemsen', 'sziemsen5@parallels.com', '417-877-9139', 'asdasd','https://robohash.org/consequatureteaque.png?size=50x50&set=set1', '0591-5335'),
       (7, 'Titos', 'Hughlin', 'thughlin6@friendfeed.com', '487-207-6691', 'khjhjk','https://robohash.org/aliquamestvero.png?size=50x50&set=set1', '53499-5553'),
       (8, 'Caspar', 'Goose', 'cgoose7@bluehost.com', '917-807-7246', 'sdbvbcvb','https://robohash.org/itaquerepellenduset.png?size=50x50&set=set1', '54868-2317'),
       (9, 'Chane', 'Chandlar', 'cchandlar8@symantec.com', '640-478-3724', 'xcbcnbn','https://robohash.org/quitemporequod.png?size=50x50&set=set1', '0519-1458'),
       (10, 'Godfree', 'Lowthian', 'glowthian9@com.com', '791-960-0015', 'dvsbvb','https://robohash.org/animiassumendaet.png?size=50x50&set=set1', '64536-2222'),
       (11, 'Van', 'Tidcombe', 'vtidcombea@wufoo.com', '442-960-2743', 'asbvzv','https://robohash.org/consecteturiurevitae.png?size=50x50&set=set1', '37012-359'),
       (12, 'Paolo', 'Thomke', 'pthomkeb@typepad.com', '526-485-4427', 'casdasd','https://robohash.org/nihilullamporro.png?size=50x50&set=set1', '35000-862'),
       (13, 'Uriel', 'Maddie', 'umaddiec@blogspot.com', '652-989-9757', 'asdqwtqw','https://robohash.org/ducimuspossimusiure.png?size=50x50&set=set1', '0781-2694'),
       (14, 'Torey', 'MacRannell', 'tmacrannelld@seesaa.net', '641-792-6020', 'xcbbvcb','https://robohash.org/necessitatibusvoluptasmollitia.png?size=50x50&set=set1', '49035-490'),
       (15, 'Emmet', 'Benoey', 'ebenoeye@aboutads.info', '107-320-5959', 'zxcbz','https://robohash.org/utpraesentiumomnis.png?size=50x50&set=set1', '55651-028'),
       (16, 'Kearney', 'Vannucci', 'kvannuccif@ucoz.ru', '488-937-9864', 'qwtytr','https://robohash.org/aperiamconsequaturblanditiis.png?size=50x50&set=set1', '42627-203'),
       (17, 'Tammy', 'Broggio', 'tbroggiog@indiegogo.com', '909-723-1994', 'zxcvbncbn','https://robohash.org/cupiditatedoloremipsa.png?size=50x50&set=set1', '16729-153'),
       (18, 'Spencer', 'Mowsdell', 'smowsdellh@java.com', '238-705-3337', 'ayqwqwe','https://robohash.org/voluptatemdoloremaliquid.png?size=50x50&set=set1', '57665-331'),
       (19, 'Allen', 'Blaszczyk', 'ablaszczyki@sfgate.com', '667-502-5114', 'qwrjj','https://robohash.org/maioresanimiut.png?size=50x50&set=set1', '51672-2088'),
       (20, 'Knox', 'Melliard', 'kmelliardj@360.cn', '627-143-9893', 'asdnvbnvbn','https://robohash.org/doloremautdelectus.png?size=50x50&set=set1', '62175-107');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users_entity\``);
  }
}
