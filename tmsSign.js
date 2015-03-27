var tmsSign = (function () {
    var tmsSignInstance;

    var createTmsSignInstance = function () {
        var SIGNALS = [];


        var tmsSignall = function () {
            /**
             *  массив слотов
             */
            var SLOTS = [];

            /**
             *  ID слота
             */
            var ID = null;

            /**
             * Устанавливает ID слота
             */
            this.setID = function (id) {
                if (id === undefined || id === null || id == '')return false;

                ID = id;
                return true;
            }

            /**
             * Возвраает Id слота
             * @return string
             */
            this.getId = function () {
                return ID;
            }

            /**
             * Возвращает позицию слота в списке слотов
             * @return int or False
             */
            this.getSlotPosition = function (slot) {
                if (slot === undefined || slot == '')return false;

                var n = SLOTS.length;
                for (i = 0; i < n; i++) {
                    if (SLOTS[i].slot !== undefined && SLOTS[i].slot == slot) {
                        return i;
                    }
                }
                return false;
            }

            /**
             * делает попытку удалить слот
             * @return boolean
             */
            this.removeSlot = function (slot) {
                if (slot === undefined || slot == '')return false;
                var pos = this.getSlotPosition(slot);
                if (pos !== false) {
                    SLOTS.splice(pos, 1);
                }
                return true;
            }

            /**
             * Делает поптыку вернуть слот
             * @return {}
             */
            this.getSlot = function (slot) {
                if (slot === undefined || signall == '')return false;
                var pos = this.getSlotPosition(slot);
                if (pos !== false) {
                    return SLOTS[pos];
                }
                return false;
            }

            /**
             * Делает поптыку создать слот или пересоздать
             * @return boolean
             */
            this.setSlot = function (slot, action) {
                if (slot === undefined || slot == '')return false;
                if (action === undefined || action == '')return false;

                this.removeSlot(slot);

                SLOTS.push({slot: slot, action: action});
                return true;

            }

            /**
             * Делает попытку выполнить все действия слота
             */
            this.execute = function () {
                try {
                    var n = SLOTS.length;
                    for (var i = 0; i < n; i++) {
                        SLOTS[i].action();
                    }
                } catch (exception_var) {
                }
            }


        }

        /**
         * Делает попытку исполнить сигнал
         * @param string signall
         */
        this.execute = function (signall) {
            var s = this.getSignall(signall);
            if (s === false)return false;
            s.execute();
        }

        this.appendSignall = function (params) {
            if (params === undefined)return false;
            if (params.id === undefined || params.id == '')return false;

            s = this.setSignall(params.id);

            if (params.slots !== undefined) {
                n = params.slots.length;
                for (i = 0; i < n; i++) {
                    if (params.slots[i].id !== undefined && params.slots[i].id != '' && params.slots[i].action !== undefined) {
                        s.setSlot(params.slots[i].id, params.slots[i].action);
                    }
                }
            }
        }

        /**
         * Делает попытку вернуть сигналл по его сигнатуре
         * @param string signall
         * @return {} or false
         */
        this.setSignall = function (signall) {
            if (signall === undefined || signall == '')return false;

            this.removeSignall(signall);

            s = new tmsSignall();
            s.setID(signall)
            SIGNALS.push(s);
            return s;

        }

        /**
         * Делает попытку вернуть суть сигнала
         * @param string signall
         * @returns {signall, action} or False
         */
        this.getSignall = function (signall) {
            if (signall === undefined || signall == '')return false;
            var pos = this.getSignalPosition(signall);
            if (pos !== false) {
                return SIGNALS[pos];
            }
            return false;
        }

        /**
         *  Делает попытку удалить сигнал по его сигнатуре
         *  @param string signal
         *  @return boolean
         */
        this.removeSignall = function (signall) {
            if (signall === undefined || signall == '')return false;
            var pos = this.getSignalPosition(signall);
            if (pos !== false) {
                SIGNALS.splice(pos, 1);
            }
            return true;
        }

        /**
         * Возвращает позицию сигнала в списке сигналов по его сигнатуре
         * @param string signall
         * @returns int or False
         */
        this.getSignalPosition = function (signall) {
            if (signall === undefined || signall == '')return false;

            var n = SIGNALS.length;
            for (i = 0; i < n; i++) {
                if (SIGNALS[i].getId() !== undefined && SIGNALS[i].getId() == signall) {
                    return i;
                }
            }
            return false;
        }

        return this;
    };

    return {
        getInstance: function () {
            if (!tmsSignInstance) {
                tmsSignInstance = createTmsSignInstance();
            }
            return tmsSignInstance;
        }
    };
})();
